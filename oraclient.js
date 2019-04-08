var oracledb = require('oracledb');
const insertstmt = "INSERT INTO vod_purchase_notification (    vod_purchase_notification_id,    vod_offer_id,    device_id," +
   " purchase_token,    purchase_time,    purchase_type,    quality,    billing_id,    customer_bill_flag,    transaction_amount," +
   " discount_code,    icoms_reporting_attempts,    last_icoms_attempt,    reported_flag,    icoms_response_code,  " +
  " icoms_purchase_message,    account_id,    revoked_flag,    received_time,    purchase_price ) VALUES ( " +
   " VOD_PURCHASE_NOTIF_SEQ.nextval,     62460,    5928319,    :purchasetoken,    sysdate,    'rent',   'sd',    'X6CYG', " +
   " 1,    499,    null,    0,    sysdate - 300,    0,    null, " +
   " 'A001ITT,IR:PURCHASE_TOKEN,SI:SITEID,I$:000000299,II:X6CYG     ,IM:001440,DT:1180808,TM:085019,ID:Code Black 115 movie               ,IT:Y,IU:Y,IC:CBS_TV_EST,null,null,null,UP.', " +
"   :accountid,    0,    sysdate,    499)";

oracledb.getConnection(
  {
    user          : "kunal",
    password      : "patil",
    connectString : "devscvex01-scan.services.coxlab.net/dcrm_devc"
  },
  function(err, connection)
  {
    connection.autoCommit = true;
    if (err) { console.error(err); return; }
    var accountIds = [ { site: 1, id: 2386280 }, { site: 541, id: 2530291}, { site: 215, id: 2370720},{ site: 707, id: 2500311}, { site: 131, id: 2384781}, { site: 333, id: 2372894}, { site: 7, id: 2578291}, { site: 186, id: 2372222}];
    accountIds.forEach( function(acct) {
        for(var i = 1; i <=10; i++) {
            var siteid = '000' + acct.site;
            const purchasetoken = 'thread-test_' + acct.id + '_' + i;
            var sql = insertstmt.replace('SITEID', siteid.substring(siteid.length-3)).replace('PURCHASE_TOKEN', (purchasetoken + '                                ').substr(0,32)); 
            connection.execute(
              sql, [purchasetoken, acct.id ], {autoCommit: true},
              function(err, result)
              {
                if (err) { console.error(err); return; }
                //console.log(result.rows);
          }); 
        }
    }); // accountIds.forEach
    
  } // function(err,connection)

);
