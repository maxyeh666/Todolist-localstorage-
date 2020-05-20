# Todolist-localstorage-

example:https://maxyeh666.github.io/Todolist-localstorage-/

<h2>程式目的</h2>
javascript練習，使用localstorage進行C(create)R(read)U(update)D(delete)的存取

<h2>localStorage使用筆記</h2>

存入資料：setItem(key,value)  
取出資料：getItem(key,value)  
移除資料：removeItem(key)  

本程式裡key=Notes

localstorage存入的資料為字串型態  
這裡使用JSON.parse()跟JSON.stringify()來將todo是來進行轉換以便寫入
