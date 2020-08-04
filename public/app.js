/* global $ */
$(function(){
    $.getJSON('/api/todos')
    .then(getTodos)
    .fail(function(err){
        console.log(err);
    });

    $('#todoInput').keypress(function(event){
        if(event.which === 13 && $('#todoInput').val() != '') {
            createTodo();
        }
    });

    $('ul').on("click", "span", function(event){
        event.stopPropagation();
        removeTodo($(this).parent());
    });

    $('ul').on("click", "li", function(){
        updateTodo($(this));
    });

    $('.theme').on("click", ".bt-green", function(){
        setGreenTheme($(this))
    });

    $('.theme').on("click", ".bt-gray", function(){
        setGrayTheme($(this))
    });
});

function getTodos(todos){
    todos.forEach(function(todo, i, arr){
        displayTodo(todo);
    });
}

function displayTodo(todo) {
    var task = $('<li class="task">' + todo.name + '<span>X</span></li>');
    task.data('id', todo._id);
    task.data('done', todo.completed);
    if(todo.completed) {
        task.addClass('done');
    }
    $('.list').append(task);
}

function createTodo(){
    var taskName = $('#todoInput').val();
    $.post('/api/todos', {name: taskName, completed: false})
    .then(function(data){
        $('#todoInput').val('');
        displayTodo(data);
    })
    .catch(function(e){
        console.log(e);
    });
}

function removeTodo(task){
        var todoId = task.data('id');
        var url = '/api/todos/' + todoId;
        $.ajax({
            url: url,
            method: 'DELETE',
            dataType: 'json'
        })
        .then(function(data){
            task.remove();
        });
}

function updateTodo(todo) {
    var todoId = todo.data('id');
    var doneFlag = !todo.data('done');
    var updateUrl = 'api/todos/' + todoId;
    $.ajax({
        url: updateUrl,
        method: 'PUT',
        data: {completed: doneFlag}
    })
    .then(function(data){
        todo.toggleClass("done");
        todo.data('done', doneFlag);
    });
}

function setGreenTheme(theme) {
    $('h1').addClass("green");
    $('h2').addClass("green-light");
    $('input').addClass("green-light green-light-border");
    $('li').addClass("green");
}

function setGrayTheme(theme) {
    $('h1').removeClass("green");
    $('h2').removeClass("green-light");
    $('input').removeClass("green-light green-light-border");
    $('li').removeClass("green");
}