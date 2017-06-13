var db_obj;
(function initDB() {
   var request = indexedDB.open('mydiary', 1);
   request.onerror = function (e) {
      console.log(e.currentTarget.error.message);
   };
   request.onsuccess = function (e) {
      db_obj = e.target.result;
   };
   request.onupgradeneeded = function (e) {//版本不一致时调用onupgradeneeded
      var thisDB = e.target.result;
      if (!thisDB.objectStoreNames.contains("diary")) {
         var objStore = thisDB.createObjectStore("diary", {keyPath: "diary_id"});
         objStore.createIndex("create_date", "create_date", {unique: false});
         objStore.createIndex("folder", "folder", {unique: false});
      }
      if (!thisDB.objectStoreNames.contains("list")) {
         var objStore = thisDB.createObjectStore("list", {keyPath: "list_id"});
         objStore.createIndex("create_date", "create_date", {unique: false});
         objStore.createIndex("folder", "folder", {unique: false});
      }
      if (!thisDB.objectStoreNames.contains("address")) {
         var objStore = thisDB.createObjectStore("address", {keyPath: "address_id"});
         objStore.createIndex("folder, alphabetical_order", ['folder', 'alphabetical_order']);
         objStore.createIndex("alphabetical_order", "alphabetical_order", {unique: false});
         objStore.createIndex("folder", "folder", {unique: false});
      }
      if (!thisDB.objectStoreNames.contains("menu")) {
         var objStore = thisDB.createObjectStore("menu", {keyPath: "folder_id", autoIncrement: true});
         objStore.createIndex("create_date", "create_date", {unique: false});
         objStore.createIndex("type", "type", {unique: false});
      }
   };
})();

function closeDB() {
   db_obj.close();
}

function deleteDB() {
   indexedDB.deleteDatabase('mydiary');
}
function addData(table, data, cb) {
   var transaction = db_obj.transaction(table, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore(table);
   var request = objectStore.add(data);
   request.onsuccess = function (e) {
      if (cb) {
         cb({
            error: 0,
            data : data
         })
      }
   };
   request.onerror = function (e) {
      if (cb) {
         cb({
            error: 1
         })
      }
   }
   
}
function addmData(table, mdata, cb) {
   var transaction = db_obj.transaction(table, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore(table);
   for(var c = 0;c<mdata.length;c++){
      var request = objectStore.add(mdata[c]);
      request.onerror = function (e) {
         if (cb) {
            cb({
               error: 1
            })
         }
      }
   }
}
function deleteData(table, id, cb) {
   var transaction = db_obj.transaction(table, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore(table);
   var request = objectStore.delete(id);
   request.onsuccess = function (e) {
      if (cb) {
         cb({
            error: 0,
            data : id
         })
      }
   };
   request.onerror = function (e) {
      if (cb) {
         cb({
            error: 1
         })
      }
   }
}

function countTotal(type, folder_id){
   db_obj = e.target.result;
   var transaction = db_obj.transaction(type, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore(type);
   var boundKeyRange = IDBKeyRange.only(folder_id);
   var rowData=[];
   objectStore.index("folder").openCursor(boundKeyRange).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor) {
         console.log(rowData.length);
         return ;
      }
      rowData.push(cursor.value);
      cursor.continue();
   };
}

function getDataById(table, id, cb) {
   var transaction = db_obj.transaction(table, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };

   var objectStore = transaction.objectStore(table);
   var request = objectStore.get(id);
   request.onsuccess = function (e) {
      if (cb) {
         cb({
            error: 0,
            data : e.target.result
         })
      }
   };
   request.onerror = function (e) {
      if (cb) {
         cb({
            error: 1
         })
      }
   }
}

function getDataAll(table, cb) {
	indexedDB.open('mydiary', 1).onsuccess = function (e) {
   db_obj = e.target.result;
   var transaction = db_obj.transaction(table, 'readonly');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore(table);
   var rowData = [];
   objectStore.openCursor(IDBKeyRange.lowerBound(0)).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor && cb) {
         cb({
            error: 0,
            data : rowData
         });
         return;
      }
      rowData.push(cursor.value);
      cursor.continue();
   };
   };
}


function getDiaryBySearch(table, keywords, cb) {
	indexedDB.open('mydiary', 1).onsuccess = function (e) {
   db_obj = e.target.result;
   var transaction = db_obj.transaction(table, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event);
   };
   var objectStore = transaction.objectStore(table);
   var boundKeyRange = IDBKeyRange.only(keywords);
   var rowData=[];
   objectStore.index("folder").openCursor(boundKeyRange).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor) {
         if (cb) {
            cb({
               error: 0,
               data : rowData
            })
         }
         return;
      }
      rowData.push(cursor.value);
      cursor.continue();
   };
   };
}
function getAddress(folder, cb) {
   indexedDB.open('mydiary', 1).onsuccess = function (e) {
   db_obj = e.target.result;
   var transaction = db_obj.transaction('address', 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore('address');
   var lowerBound = [folder,'#'];//顺序影响结果，要先选出文件夹再定范围
   var upperBound = [folder,'Z'];
   var range = IDBKeyRange.bound(lowerBound, upperBound);
   var rowData=[];
   objectStore.index("folder, alphabetical_order").openCursor(range).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor) {
         if (cb) {
            cb({
               error: 0,
               data : rowData
            })
         }
         return;
      }
      rowData.push(cursor.value);
      cursor.continue();
   };
   };
}
function searchString(keyword,cb){
   var keyword = keyword;
   var transaction = db_obj.transaction("diary", "readwrite");
   var objectStore = transaction.objectStore("diary");
   var request = objectStore.openCursor();
   var result = [];
   request.onsuccess = function(event) {
       var cursor = event.target.result;
       if (cursor) {
           if (cursor.value.title.indexOf(keyword) !== -1 ||cursor.value.content.indexOf(keyword) !== -1) {                
               result.push(cursor.value);
           }  
           cursor.continue();          
       }else{
         cb(result);
       }
   };
}
function searchAddress(folder, keyword, cb) {
   indexedDB.open('mydiary', 1).onsuccess = function (e) {
   db_obj = e.target.result;
   var transaction = db_obj.transaction('address', 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore('address');
   var lowerBound = [folder,'A'];//顺序影响结果，要先选出文件夹再定范围
   var upperBound = [folder,'Z'];
   var range = IDBKeyRange.bound(lowerBound, upperBound);
   var result=[];
   objectStore.index("folder, alphabetical_order").openCursor(range).onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
           if (cursor.value.name.toLowerCase().indexOf(keyword) !== -1 ||cursor.value.name.indexOf(keyword) !== -1 ||String(cursor.value.number).indexOf(keyword) !== -1) {                
               result.push(cursor.value);
           }  
           cursor.continue();          
       }else{
         cb(result);
       }
   };
   };
}
function getDataByPager(start, end, cb) {
   var transaction = db_obj.transaction("diary", 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore("diary");
   var boundKeyRange = IDBKeyRange.bound(start, end, false, true);
   var rowData = [];
   objectStore.openCursor(boundKeyRange).onsuccess = function (event) {
      var cursor = event.target.result;
      if (!cursor && cb) {
         cb({
            error: 0,
            data : rowData
         });
         return;
      }
      rowData.push(cursor.value);
      cursor.continue();
   };
}

function updateData(table, id, updateData, cb) {
   var transaction = db_obj.transaction(table, 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore(table);
   var request = objectStore.get(id);
   request.onsuccess = function (e) {
      var thisDB = e.target.result;
      for (key in updateData) {
         thisDB[key] = updateData[key];
      }
      objectStore.put(thisDB);
      if (cb) {
         cb({
            error: 0,
            data : thisDB
         })
      }
   };
   request.onerror = function (e) {
      if (cb) {
         cb({
            error: 1
         })
      }
   }
}

function plus(folder_id) {
   var transaction = db_obj.transaction('menu', 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore('menu');
   var request = objectStore.get(Number(folder_id));
   request.onsuccess = function (e) {
      var thisDB = e.target.result;
      thisDB['count'] = thisDB['count']+1;
      objectStore.put(thisDB);
   };
   request.onerror = function (e) {
      alert("+error!!!")
   }
}

function minus(folder_id) {
   var transaction = db_obj.transaction('menu', 'readwrite');
   transaction.oncomplete = function () {
      console.log("transaction complete");
   };
   transaction.onerror = function (event) {
      console.dir(event)
   };
   var objectStore = transaction.objectStore('menu');
   var request = objectStore.get(Number(folder_id));
   request.onsuccess = function (e) {
      var thisDB = e.target.result;
      thisDB['count'] = thisDB['count']-1;
      objectStore.put(thisDB);
   };
   request.onerror = function (e) {
      alert("-error!!!")
   }
}
