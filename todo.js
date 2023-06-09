window.addEventListener("DOMContentLoaded",async()=>{
    let response = await axios.get('https://crudcrud.com/api/4687bb763ee04137b1daa7e6113fd784/taskData')
    for(var i=0;i<response.data.length;i++){
        if(response.data[i].flag){
            printTaskDone(response.data[i],response.data[i]._id)
        }else {
            printTask(response.data[i],response.data[i]._id)
        }
    }
    })


async function details(addTask){
    let obj = {
        task:document.getElementById("task").value,
        desc:document.getElementById("description").value,
        flag:false
    };
    let res = await axios.post('https://crudcrud.com/api/4687bb763ee04137b1daa7e6113fd784/taskData', obj)
    printTask(res.data,res.data._id)
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

async function removeItem(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            
            let tRow = e.target.parentElement;
            const _id = e.target.parentElement.getAttribute('data-key');
        
            
            let url = "https://crudcrud.com/api/4687bb763ee04137b1daa7e6113fd784/taskData/"+ _id
            let res1 = await axios.delete(url)
            console.log(res1)
            tBody.removeChild(tRow);
        }
    }
}


async function doneTask(e){
    let tRow = e.target.parentElement;
    const key = e.target.parentElement.getAttribute('data-key');
    const link = 'https://crudcrud.com/api/4687bb763ee04137b1daa7e6113fd784/taskData/'+key
    
    let res2 = await axios.get(link)
    let obj = res2.data
    printTaskDone(res2.data,res2.data._id)
    let res3 = await axios.put(link,{task:obj.task,
                                     desc:obj.desc,
                                     flag:true})
    
    tBody.removeChild(tRow);
}
