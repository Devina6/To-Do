window.addEventListener("DOMContentLoaded",()=>{
    axios
        .get('https://crudcrud.com/api/b2765a7fa96b47d280f60e2fa9660de7/taskData')
        .then(res => {
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].flag){
                        printTaskDone(res.data[i],res.data[i]._id)
                    } else{
                        printTask(res.data[i],res.data[i]._id)
                    }
                }
    })
        .catch(err => console.log(err))
})


function details(addTask){
    let obj = {
        task:document.getElementById("task").value,
        desc:document.getElementById("description").value,
        flag:false
    };
    axios.post('https://crudcrud.com/api/b2765a7fa96b47d280f60e2fa9660de7/taskData', obj)
        .then(res => printTask(res.data,res.data._id))
        .catch(err => console.log(err))
}

function printTask(obj,id){
    let parentTBody = document.getElementById('tableBody');
    let childTRow = document.createElement('tr');
    let childTRHData1 = document.createElement('td');
    let childTRHData2 = document.createElement('td');
    childTRow.setAttribute('data-key',id);
    childTRHData1.textContent = obj.task
    childTRHData2.textContent = obj.desc
    parentTBody.appendChild(childTRow);
    childTRow.appendChild(childTRHData1)
    childTRow.appendChild(childTRHData2)
    
    let doneBtn = document.createElement('button');
    doneBtn.className = 'btn btn-success done';
    doneBtn.setAttribute('id','done-btn');
    doneBtn.appendChild(document.createTextNode('Done'));
    childTRow.appendChild(doneBtn)
    
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger float-right delete';
    deleteBtn.appendChild(document.createTextNode('Remove'));
    childTRow.appendChild(deleteBtn)   
    
    let taskDone = document.getElementById('done-btn');
    taskDone.addEventListener('click',doneTask);
}

function printTaskDone(obj,id){
    let parentTBody = document.getElementById('tableBodyCompleted');
    let childTRow = document.createElement('tr');
    let childTRHData1 = document.createElement('td');
    let childTRHData2 = document.createElement('td');
    childTRow.setAttribute('data-key',id);
    childTRHData1.textContent = obj.task
    childTRHData2.textContent = obj.desc
    parentTBody.appendChild(childTRow);
    childTRow.appendChild(childTRHData1)
    childTRow.appendChild(childTRHData2)
    
}
var tBody = document.getElementById('tableBody');
tBody.addEventListener('click',removeItem);

function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            
            let tRow = e.target.parentElement;
            const _id = e.target.parentElement.getAttribute('data-key');
        
            
            let url = "https://crudcrud.com/api/b2765a7fa96b47d280f60e2fa9660de7/taskData/"+ _id
            axios
                .delete(url)
                .then(res => console.log(res))
                .catch(err => console.log(err))
            
            tBody.removeChild(tRow);
        }
    }
}


function doneTask(e){
    let tRow = e.target.parentElement;
    const key = e.target.parentElement.getAttribute('data-key');
    const link = 'https://crudcrud.com/api/b2765a7fa96b47d280f60e2fa9660de7/taskData/'+key
    
    axios
        .get(link)
        .then(res=>{
        let obj = res.data;
        printTaskDone(res.data,res.data._id)
        axios
            .put(link,{
                task:obj.task,
                desc:obj.desc,
                flag:true
        })
    })
        .catch(err=>console.log(err))
    
    
    tBody.removeChild(tRow);
}
