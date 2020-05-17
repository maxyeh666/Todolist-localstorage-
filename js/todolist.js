let note = document.querySelector('#note')
let getData = document.querySelector('#input-data')
let NewTodo = document.querySelector('#create')
let UpdateTodo = document.querySelector('#update')
let DeleteTodo = document.querySelector('#delete')
let ChangeStatus = document.querySelector('#change')

//所有讀取完畢載入清單
window.onload = function  (){
    NoteList()
}

//讀取所有事項清單
function NoteList(){
    //清空網頁顯示資料的部分
    note.innerHTML = ''
    //每次都是一個新的request
    let getRequest = new XMLHttpRequest() 
    getRequest.open('GET','http://localhost:3000/Notes',true)
    getRequest.send()
    getRequest.onreadystatechange = function (){
        if (getRequest.readyState == 4 && getRequest.status >= 200 && getRequest.status < 400){
            //先使用reponseText將json轉為字串後接收，再經由JSON.parse轉成陣列放入data
            let data = JSON.parse(getRequest.responseText) 
            //依序將收到的資料寫入HTML，這邊加入判斷狀態是否已完成所呈現的圖片
            for(let i = 0;i < data.length; i++){   
                if(data[i].status === 'done'){
                    note.innerHTML = note.innerHTML + '<div class="note-items row col-md-12"><label class="todo-items"><input class="checkerbox-swicher check-items" name=items'+ data[i].id + ' type="checkbox" value="0"></label><sapn class="todo-items col-md-8 todo-content">'  + data[i].todo + '</sapn><sapn class="todo-items col-md-2"><i class="fas fa-check"></i></sapn><sapn class="todo-items col-md-2">' + data[i].time +'</sapn></div>'
                }else{
                    note.innerHTML = note.innerHTML + '<div class="note-items row col-md-12"><label class="todo-items"><input class="checkerbox-swicher check-items" name=items'+ data[i].id + ' type="checkbox" value="0"></label><sapn class="todo-items col-md-8 todo-content">'  + data[i].todo + '</sapn><sapn class="todo-items col-md-2"><i class="fas fa-times"></i></sapn><sapn class="todo-items col-md-2">' + data[i].time +'</sapn></div>'
                }
                
            }
            //代辦事項完成時加上刪除線
            let todocontent = document.querySelectorAll('.todo-content')
            
            for(let i = 0;i < data.length; i++){
                if(data[i].status === 'done'){
                    todocontent[i].classList.add('text-linethrough')
                }else{
                    todocontent[i].classList.remove('text-linethrough')
                }
            }
            
            //判斷選取狀態的顯示
            let noteItems = document.querySelectorAll('.note-items')
            let switcher = document.querySelectorAll('.checkerbox-swicher')

            for(let i = 0;i < noteItems.length;i++){
                noteItems[i].addEventListener('click',function(){
                    if(switcher[i].value == 0){
                        noteItems[i].classList.add('selected')
                        switcher[i].checked = true
                        switcher[i].value = 1
                    }else if(switcher[i].value == 1){
                        noteItems[i].classList.remove('selected')
                        switcher[i].checked = false
                        switcher[i].value = 0
                    }
                    return switcher[i].checked
                })
            }
        }
    }
}

//新增代辦事項
NewTodo.addEventListener('click',function(){
    //每次都是一個新的request
    let getRequest = new XMLHttpRequest() 
    getRequest.open('GET','http://localhost:3000/Notes',true)
    getRequest.send()
    let date = new Date()
    let Todo = {
        todo : getData.value,
        time : date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(), //getMonth()從0開始，所以要+1
        status : "undone",
    }
    //清空輸入欄
    getData.value = ''

    //新增的資料(Todo)轉為字串
    let newData = JSON.stringify(Todo)

    //每次都是一個新的request
    let postRequest = new XMLHttpRequest()
    postRequest.open('POST','http://localhost:3000/Notes',true)
    postRequest.setRequestHeader('Content-type', 'application/json');
    postRequest.send(newData)

    postRequest.onreadystatechange = function (){
        if (postRequest.readyState == 4 && postRequest.status == 201){
            NoteList()
        }
    }
})

//刪除代辦事項
DeleteTodo.addEventListener('click',function(){
    let checker = document.querySelectorAll('.check-items')

    let getRequest = new XMLHttpRequest() 
    getRequest.open('GET','http://localhost:3000/Notes',true)
    getRequest.send()

    getRequest.onreadystatechange = function (){
        if (getRequest.readyState == 4 && getRequest.status == 200){
            //取得所有清單資料
            let getData = JSON.parse(getRequest.responseText)
            //取所有input的值
            for(let i = 0;i < checker.length; i++){ 
                //取得是否有勾選  
                if(checker[i].checked){ 
                    //每次都是一個新的request
                    console.log(checker[i])
                    let deleteRequest = new XMLHttpRequest()
                    deleteRequest.open('DELETE','http://localhost:3000/Notes/' + getData[i].id,true) 
                    deleteRequest.send()

                    deleteRequest.onreadystatechange = function (){
                        if (deleteRequest.readyState == 4 && deleteRequest.status === 200){
                            NoteList()
                        }
                    }
                }
            }
        }
    }
})

//更新代辦事項
UpdateTodo.addEventListener('click',function(){
    let checker = document.querySelectorAll('.check-items')

    let getRequest = new XMLHttpRequest() 
    getRequest.open('GET','http://localhost:3000/Notes',true)
    getRequest.send()

    getRequest.onreadystatechange = function (){
        if (getRequest.readyState == 4 && getRequest.status == 200){
            //取得所有清單資料
            let getData = JSON.parse(getRequest.responseText)
            //取所有input的值
            for(let i = 0;i < checker.length; i++){ 
                //取得是否有勾選  
                if(checker[i].checked){ 
                    let updateTodo = {
                        todo : input,
                        time : date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(), //getMonth()從0開始，所以要+1
                    }

                    let newData = JSON.stringify(updateTodo)
                    //清空輸入欄
                    getData.value = ''
                    //每次都是一個新的request
                    let updateRequest = new XMLHttpRequest()
                    //只更新todo的內容，用PATCH即可(PUT會清空所有內容後再增加輸入的內容)第一個input不是勾選的範圍，所以要變成i-1
                    updateRequest.open('PATCH','http://localhost:3000/Notes/' + getData[i].id,true) 
                    updateRequest.setRequestHeader('Content-type', 'application/json');
                    updateRequest.send(newData)

                    updateRequest.onreadystatechange = function (){
                        if (updateRequest.readyState == 4 &&  updateRequest.status === 200){
                            
                            NoteList()
                        }
                    }
                }
            }
        }
    }
})

//切換代辦事項狀態
ChangeStatus.addEventListener('click',function(){
    let checker = document.querySelectorAll('.check-items')

    let getRequest = new XMLHttpRequest() 
    getRequest.open('GET','http://localhost:3000/Notes',true)
    getRequest.send()

    getRequest.onreadystatechange = function (){
        if (getRequest.readyState == 4 && getRequest.status === 200){
            //取得所有清單資料
            let getData = JSON.parse(getRequest.responseText)
            //取所有input的值
            for(let i = 0;i < checker.length; i++){ 
                //取得input裡面name有items的值
                if((checker[i]).name.substr(0,5) === "items"){ 
                    //取得是否有勾選  
                    if(checker[i].checked){ 
                        let changeStatus = {
                            status : ''
                        }

                        //切換狀態
                        if(getData[i].status === "undone"){
                            changeStatus.status = "done"
                        }else{
                            changeStatus.status = "undone"
                        }

                        let newData = JSON.stringify(changeStatus)

                        //每次都是一個新的request
                        let changeRequest = new XMLHttpRequest()
                        //只更新todo的內容，用PATCH即可(PUT會清空所有內容後再增加輸入的內容)第一個input不是勾選的範圍，所以要變成i-1
                        changeRequest.open('PATCH','http://localhost:3000/Notes/' + getData[(i-1)].id,true) 
                        changeRequest.setRequestHeader('Content-type', 'application/json');
                        changeRequest.send(newData)

                        changeRequest.onreadystatechange = function (){
                            if (changeRequest.readyState == 4 &&  changeRequest.status === 200){
                                NoteList()
                            }
                        }
                    }
                }
            }
        }
    }
})