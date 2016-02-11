import { spawn } from 'child_process';
// import history from '../history';
import _ from 'lodash';
import db from './db.js';

export const QUERYING = 'QUERYING';
export const QUERYED = 'QUERYED';
// export const DROPED_FILE = 'DROPED_FILE';
// export const QUERYED_HISTORY_ORDERS = 'QUERYED_HISTORY_ORDERS';
//
export function querying() {
  return {
    type: QUERYING
  };
}

export function queryed(rows) {
  return {
    type: QUERYED,
    rows
  };
}


export function queryDevices() {
  return (dispatch, getState) => {
    console.log('call queryDevices');
    // dispatch(querying());
    let stmt = db.prepare("select * from `device`");
    stmt.all((err, rows) => {
      if (err) {
        console.log("insert err is " + err);
      } else {
        console.log("rows is ", rows);

        //adb获取已接入的设备
        adbExec(dispatch, rows);
      }
    });
  }
}

const adbExec = (dispatch,rows) => {
  const adb = spawn('/usr/local/bin/adb', ['devices']);
  const grep = spawn('grep', ['device$']);
  const cut = spawn('cut', ['-f1']);

  adb.stdout.on('data', (data) => {
    console.log(`adb stdout: ${data}`);
    grep.stdin.write(data);
  });

  adb.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  adb.on('close', (code) => {
    console.log(`adb child process exited with code ${code}`);
    grep.stdin.end();
  });

  grep.stdout.on('data', (data) => {
    console.log(`grep stdout: ${data}`);
    cut.stdin.write(data)
  });

  grep.stderr.on('data', (data) => {
    console.log(`grep stderr: ${data}`);
  });

  grep.on('close', (code) => {
    if (code != 0) {
      dispatch(queryed(rows));
    }
    console.log(`grep child process exited with code ${code}`);
    cut.stdin.end();
  });

  cut.stdout.on('data', (data) => {
    console.log(`cut stdout: ${data}`);
    updateDevices(rows, data, dispatch)
  })

  cut.on('clode', (code) => {
    console.log(`cut child process exited with code ${code}`);
  })
}

const updateDevices = (rows, data, dispatch) => {
  data = `${data}`;
  data = data.split("\n");
  console.log('updateDevices', data)

  let flag = false;

  //将接入设备与数据库数据合并
  data.forEach((abd_id, index, data) => {
    if (_.isEmpty(abd_id)) {
      return;
    }
    let findIndex = _.findIndex(rows, ['adb_id', abd_id]);
    if (findIndex != -1) {
      //db里有此设备信息
      rows[findIndex].connect = true;
      rows[findIndex].db = true;
    } else {
      flag = true;
      rows.push({
        'adb_id': abd_id,
        'name': abd_id,
        'system_version': abd_id,
        'desc': abd_id,
        'connect': true,
        'db': false
      });
    }
  })

  if (flag === true) {
    //将已接入单数据库中没有的设备插入数据库
    let stmt = db.prepare("INSERT INTO `device` VALUES (null,?,?,?,?)");
    rows.forEach((item, index, rows) => {
      if (item.db === false) {
        stmt.run([item.adb_id, item.name, item.system_version, item.desc], (err) => {
          if (err) {
            console.log("insert device err is " + err);
            // rollback here
          } else {
            rows[index].id = stmt.lastID;
            rows[index].db = true;
            console.log("lastid is " + stmt.lastID);
            dispatch(queryed(rows));
          }
        });
      };
    });
  } else {
    dispatch(queryed(rows));
  }
}


export function onSubmit(values, dispatch) {

  return (dispatch, getState) => {
    const { device } = getState();
    console.log(values,device,history);

    const stmt = db.prepare("update `device` set `name`=?, `system_version`=?, `desc`=? where `id`=? ");
    stmt.run([values.name, values.system_version, values.desc, values.id], (err) => {
      if (err) {
        console.log("update err is " + err);
      } else {
        // dispatch(submited(values));
        console.log('ok');
        // history.pushState(device, "/devices/index")
      }
    });
  };
}
