/* 
    Version : Merge_1_0_0
    Date : 2024-12-27(금)
    Content : merge 적용
*/

//Var
const Btn_AddToDo = document.getElementById('addTodo');
const Input_ToDo = document.getElementById('todoInput');
const ListGroup_ToDo = document.getElementById('todoList');

var Conf_Btn_BackgroundColor = "#212529";

//Function
 //추가 버튼 클릭시 트리거 함수
function Func_Main_Btn_AddToDo_triggler(){
    const Str_Input_ToDo_value = Input_ToDo.value.trim();
    if (Str_Input_ToDo_value !== ''){
        //컴포넌트 생성
        const Comp_List_Item = document.createElement('li');
        const Comp_CheckBox = document.createElement('input');
        const spanElement = document.createElement("span");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        spanElement.classList.add("ms-2", "flex-grow-1");
        spanElement.textContent = Str_Input_ToDo_value;

        //컴포넌트 설정
        Comp_List_Item.className = "list-group-item d-flex align-items-center";
        Comp_CheckBox.type = "checkbox";
        Comp_CheckBox.className = "btn btn-primary";
        Comp_CheckBox.addEventListener('change',Func_Sub_Comp_CheckBox_trigger);
        //삭제버튼
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        deleteButton.textContent = "삭제";
        deleteButton.addEventListener("click",Func_sub_deleteButton);
        //수정버튼
        editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
        editButton.textContent = "수정";
        editButton.addEventListener("click",Func_sub_editButton);
        //컴포넌트 합체
        Comp_List_Item.appendChild(Comp_CheckBox);
        Comp_List_Item.appendChild(spanElement);
        Comp_List_Item.appendChild(editButton);
        Comp_List_Item.appendChild(deleteButton);
        ListGroup_ToDo.appendChild(Comp_List_Item);

        const todos = loadTodos();
        todos.push({ text: Str_Input_ToDo_value, checked: false });
        saveTodos(todos);

        //초기화
        Input_ToDo.value = ''
    }
    else {
        alert('할 일을 입력해주세요');
    }
}
 //Comp_CheckBox클릭 트리거
function Func_Sub_Comp_CheckBox_trigger(event){
    const Comp_List_Item = event.target.closest('li');
    if (event.target.checked){
        Comp_List_Item.style.backgroundColor = Conf_Btn_BackgroundColor;
        Comp_List_Item.style.color = 'white';
    }
    else{
        Comp_List_Item.style.backgroundColor = 'white';
        Comp_List_Item.style.color = 'black';
    }
    const todos = loadTodos();
    const index = Array.from(Comp_List_Item.parentElement.children).indexOf(Comp_List_Item);
    todos[index].checked = event.target.checked;
    saveTodos(todos);
}

function Func_sub_deleteButton(event){
    const Comp_List_Item = event.target.closest('li');
    // localStorage 업데이트
    const todos = loadTodos();
    const index = Array.from(Comp_List_Item.parentElement.children).indexOf(Comp_List_Item);
    todos.splice(index, 1);
    saveTodos(todos);
    // 요소 삭제
    Comp_List_Item.remove();
}

function Func_sub_editButton(event) {
    const Comp_List_Item = event.target.closest('li');
    const Comp_Span = Comp_List_Item.querySelector('span');
    const Comp_Button = event.target.closest('button');

    if (Comp_Button.textContent === "수정") {
        // "수정" 상태
        Comp_Button.textContent = "완료";

        const inputField = document.createElement("input");
        inputField.type = "text";
        inputField.classList.add("form-control", "ms-2");
        inputField.value = Comp_Span.textContent;

        Comp_List_Item.replaceChild(inputField, Comp_Span);
        inputField.focus();
    } else {
        // "완료" 상태
        const inputField = Comp_List_Item.querySelector("input[type='text']");
        const newText = inputField.value.trim();

        if (newText !== "") {
            const newSpan = document.createElement("span");
            newSpan.classList.add("ms-2", "flex-grow-1");
            newSpan.textContent = newText;

            Comp_List_Item.replaceChild(newSpan, inputField);
            Comp_Button.textContent = "수정";

            // localStorage 업데이트
            const todos = loadTodos();
            const index = Array.from(Comp_List_Item.parentElement.children).indexOf(Comp_List_Item);
            console.log(todos);
            console.log(index);
            todos[index].text = newText;
            saveTodos(todos);
        }
    }
}


 // localStorage에서 할일 목록 가져오기
function loadTodos() {
   const savedTodos = localStorage.getItem("todoList");
   return savedTodos ? JSON.parse(savedTodos) : [];
}
 
 // localStorage에 할일 목록 저장하기
function saveTodos(todos) {
  localStorage.setItem("todoList", JSON.stringify(todos));
}

function initialize() {
    // 저장된 할 일 목록 불러오기
    const todos = loadTodos();
    todos.forEach((todo) => {
        const Comp_List_Item = document.createElement('li');
        const Comp_CheckBox = document.createElement('input');
        const spanElement = document.createElement("span");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        spanElement.classList.add("ms-2", "flex-grow-1");
        spanElement.textContent = todo.text;

        // 컴포넌트 설정
        Comp_List_Item.className = "list-group-item d-flex align-items-center";
        Comp_CheckBox.type = "checkbox";
        Comp_CheckBox.className = "btn btn-primary";
        Comp_CheckBox.checked = todo.checked; 
        if (Comp_CheckBox.checked){
            Comp_List_Item.style.backgroundColor = Conf_Btn_BackgroundColor;
            Comp_List_Item.style.color = 'white';
        }
        Comp_CheckBox.addEventListener('change', Func_Sub_Comp_CheckBox_trigger);
        // 삭제 버튼
        deleteButton.classList.add("btn", "btn-danger", "btn-sm", "ms-2");
        deleteButton.textContent = "삭제";
        deleteButton.addEventListener("click", Func_sub_deleteButton);
        // 수정 버튼
        editButton.classList.add("btn", "btn-warning", "btn-sm", "ms-2");
        editButton.textContent = "수정";
        editButton.addEventListener("click", Func_sub_editButton);
        // 컴포넌트 합체
        Comp_List_Item.appendChild(Comp_CheckBox);
        Comp_List_Item.appendChild(spanElement);
        Comp_List_Item.appendChild(editButton);
        Comp_List_Item.appendChild(deleteButton);
        ListGroup_ToDo.appendChild(Comp_List_Item);
    });
}

//Event
Btn_AddToDo.addEventListener('click',Func_Main_Btn_AddToDo_triggler);
document.addEventListener("DOMContentLoaded", initialize);