import { spawn } from 'child_process';
import { getValues } from 'redux-form';
import db from './db.js';

export const SUBMITING = 'SUBMITING';
export const SUBMITED = 'SUBMITED';
export const DROPED_FILE = 'DROPED_FILE';
export const QUERYED_HISTORY_ORDERS = 'QUERYED_HISTORY_ORDERS';
export const QUERY_ORDER = 'QUERY_ORDER';

export function submiting() {
  return {
    type: SUBMITING
  };
}

export function submited(values,lastID) {
  return {
    type: SUBMITED,
    values,
    lastID
  };
}

export function dropedFile(name,path) {
  return {
    type: DROPED_FILE,
    name,
    path
  };
}


export function queryedHistoryOrders(rows) {
  return {
    type: QUERYED_HISTORY_ORDERS,
    rows
  };
}

export function queryOrderAction(row) {
  return {
    type: QUERY_ORDER,
    row
  };
}

export function diplayStdout(stdout,row) {
  return {
    type: DISPLAY_STDOUT,
    row,
    stdout
  };
}

export function onSubmit(values, dispatch) {

  return (dispatch, getState) => {
    const { orderstate } = getState();
    console.log(values,orderstate);


    const stmt = db.prepare("INSERT INTO `order` VALUES (null,?,?,?,?,?,?,null,null)");
    stmt.run([values.game, values.version, values.factory, values.packageName, values.mainactive,orderstate.filePath], (err) => {
      if (err) {
        console.log("insert err is " + err);
      } else {
        console.log("lastid is "+stmt.lastID);
        dispatch(submited(values,stmt.lastID));
      }
    });
  };
}


export function execTestFlow(orderstate) {

  return (dispatch, getState) => {

    const {game,version,factory,packagename,mainactive,id,path} = orderstate.get("order")

    if (process.env.NODE_ENV === 'development') {
      const testerFile = './tester.sh';
    } else {
      const testerFile = process.resourcesPath + "/app/tester.sh";
    }

    console.log('call execTestFlow',packagename,mainactive, id,path);
    const tester = spawn('sh', [
      testerFile,
      path,
      packagename + '/' + packagename + '.' + mainactive,
      packagename
    ]);

    let stdout = ""

    tester.stdout.on('data', (data) => {
      console.log(`stdout is ${data}`);
      stdout +=`${data}`+"\n";
    });

    tester.stderr.on('data', (data) => {
      console.log(`stderr is ${data}`);
    });

    tester.on('close', (code) => {
      console.log("full stdout is ",stdout)
      const stmt = db.prepare("update `order` set `stdout`='"+stdout+"' where `id`="+id);
      stmt.run((err) => {
        if (err) {
          console.log("update err is " + err);
        }

        dispatch(queryOrderAction(row));
      });
      console.log(`child process exited with code ${code}`);
    });

    // dispatch(submited());
  };
}


export function onDrop(files) {
    console.log('Received files: ', files);
    return (dispatch, getState) => {
      const name = Date.now() + '_' + files[0].name;
      const path = process.resourcesPath + '/app/apk/' + name;

      const cp = spawn('cp', [
        files[0].path,
        path
      ]);

      cp.stdout.on('data', (data) => {
        console.log('stdout', data);
      });

      cp.stderr.on('data', (data) => {
        console.log(`stderr is ${data}`);
        //dispatch err
      });

      cp.on('close', (code) => {
        //dispatch success
        dispatch(dropedFile(name,path))
        console.log(`child process exited with code ${code}`);
      });
    }
}


export function historyOrders(){
  console.log('call historyOrders')
  return (dispatch, getState) => {
    const stmt = db.prepare("select * from  `order`");
    stmt.all((err,rows) => {
      if (err) {
        console.log("select err is " + err);
      } else {
        console.log("rows is ", rows);
        dispatch(queryedHistoryOrders(rows));
      }
    });
  }
}

export function queryOrder(id){
  console.log('call queryOrder',id)
  return (dispatch, getState) => {
    const stmt = db.prepare("select * from  `order` where `id`="+id);
    stmt.get((err,row) => {
      if (err) {
        console.log("select err is " + err);
      } else {
        console.log("row is ", row);
        dispatch(queryOrderAction(row));
      }
    });
  }
}
