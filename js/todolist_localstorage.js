//標籤選取變數
let note = document.querySelector('#note')
let getData = document.querySelector('#input-data')
let NewTodo = document.querySelector('#create')
let UpdateTodo = document.querySelector('#update')
let ChangeStatus = document.querySelector('#change')
let DeleteTodo = document.querySelector('#delete')


function Listing(){
    if(localStorage.Notes == '[]'){
        note.innerHTML = '<div class="note-items">還沒有輸入代辦事項喔!</div>'
        localStorage.setItem('Notes','[]')
    }else{
        let localData = localStorage.Notes
        let list = JSON.parse(localData)
        //先清空代辦事項內容
        note.innerHTML = ''
        
        //顯示取得的資料，且判斷完成與未完成要顯示的圖案
        for(let i = 0;i < list.length; i++){   
            if(list[i].status === 'done'){
                note.innerHTML = note.innerHTML + '<div class="note-items row col-md-12"><label class="todo-items"><input class="checkerbox-swicher check-items" name=items'+ list[i].id + ' type="checkbox" value="0"></label><sapn class="todo-items col-md-8 todo-content">'  + list[i].todo + '</sapn><sapn class="todo-items col-md-2"><i class="fas fa-check"></i></sapn><sapn class="todo-items col-md-2">' + list[i].time +'</sapn></div>'
            }else{
                note.innerHTML = note.innerHTML + '<div class="note-items row col-md-12"><label class="todo-items"><input class="checkerbox-swicher check-items" name=items'+ list[i].id + ' type="checkbox" value="0"></label><sapn class="todo-items col-md-8 todo-content">'  + list[i].todo + '</sapn><sapn class="todo-items col-md-2"><i class="fas fa-times"></i></sapn><sapn class="todo-items col-md-2">' + list[i].time +'</sapn></div>'
            }
        }
        //代辦事項完成時加上刪除線
        let todocontent = document.querySelectorAll('.todo-content')
    
        for(let i = 0;i < list.length; i++){
            if(list[i].status === 'done'){
                todocontent[i].classList.add('text-linethrough')
            }else{
                todocontent[i].classList.remove('text-linethrough')
            }
        }
    
        //處理完成狀態的顯示
        let noteItems = document.querySelectorAll('.note-items')
        let switcher = document.querySelectorAll('.checkerbox-swicher')
        let checker = document.querySelectorAll('.checker')
        
        //選取狀態的圖案切換
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

function Add(){
    if (!getData.value == ''){
        let date = new Date
        let item = {
            todo : getData.value.trim(),
            status :　'undone',
            time : date.getFullYear() + '/' + (date.getMonth()+1) + '/' + date.getDate(), //getMonth()從0開始，所以要+1　
        }
        //取得localStorage的資料後，轉換成陣列將資料寫入
        let list = localStorage.getItem('Notes')
        let data = JSON.parse(list)
        data.push(item)
        //將寫入資料的陣列轉為字串後寫入localStorage
        let newData = JSON.stringify(data)
        localStorage.setItem('Notes',newData)
        //清空input的資料
        getData.value = ''
    }else{
        alert('請不要輸入空白!')
    }
}

function Delete(){
    //取得class="check-items"的內容
    let checker = document.querySelectorAll('.check-items')
    //取得localStorage的資料後轉為陣列
    let list = localStorage.getItem('Notes')
    let data = JSON.parse(list)

    for(let i = 0;i < checker.length; i++){ 
        //取得class="check-items"裡面name="items"的值
        if((checker[i]).name.substr(0,5) === "items"){ 
            //取得是否有勾選  
            if(checker[i].checked){ 
                //刪除陣列資料
                data.splice(i,1)

                //將寫入資料的陣列轉為字串後寫入localStorage
                let newData = JSON.stringify(data)
                localStorage.setItem('Notes',newData)
            }
        }
    }
}

function Update(){
    if (!getData.value == ''){
    //取得class="check-items"的內容
    let checker = document.querySelectorAll('.check-items')
    //取得localStorage的資料後轉為陣列
    let list = localStorage.getItem('Notes')
    let data = JSON.parse(list)

    for(let i = 0;i < checker.length; i++){ 
        //取得class="check-items"裡面name="items"的值
        if((checker[i]).name.substr(0,5) === "items"){ 
            //取得是否有勾選  
            if(checker[i].checked){ 
                //新的資料
                let item = {
                    todo : getData.value,
                    status :　data[i].status,
                    time : data[i].time　
                }

                data[i] = item

                //將修改資料的陣列轉為字串後寫入localStorage
                let newData = JSON.stringify(data)
                localStorage.setItem('Notes',newData)
            }
        }
    }
    }else{
        alert('請不要輸入空白!')
    }
}

function ChangeSwitch(){
    //取得class="check-items"的內容
    let checker = document.querySelectorAll('.check-items')
    //取得localStorage的資料後轉為陣列
    let list = localStorage.getItem('Notes')
    let data = JSON.parse(list)

    for(let i = 0;i < checker.length; i++){ 
        //取得class="check-items"裡面name="items"的值
        if((checker[i]).name.substr(0,5) === "items"){ 
            //取得是否有勾選  
            if(checker[i].checked){ 
                //切換狀態
                if(data[i].status === "undone"){
                    data[i].status = "done"
                }else{
                    data[i].status = "undone"
                }

                //將修改資料的陣列轉為字串後寫入localStorage
                let newData = JSON.stringify(data)
                localStorage.setItem('Notes',newData)
            }
        }
    }
}

//所有讀取完畢載入清單
window.onload = function  (){
    Listing()
}

//新增代辦事項
NewTodo.addEventListener('click',function(){
    Add()
    Listing()
})
//修改代辦事項
UpdateTodo.addEventListener('click',function(){
    Update()
    Listing()
})
//更改代辦事項狀態
ChangeStatus.addEventListener('click',function(){
    ChangeSwitch()
    Listing()
})
//新增刪除事項
DeleteTodo.addEventListener('click',function(){
    Delete()
    Listing()
})