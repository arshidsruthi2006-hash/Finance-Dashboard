let button=document.getElementById("submit");
button.addEventListener("click",()=>{
let select1=document.getElementById("select-option");
 let select2=select1.value;
 let option1="User";
 let option2="Admin";
 if(option2==select2){
    let login=document.getElementById("login");
    login.style.display="none";
     let navigation=document.createElement("div");
     navigation.id="navigation";
   let body=document.getElementById("body");
   body.append(navigation);
   
   let p1=document.createElement("p");
   p1.id="p1";
   p1.innerText="Navigation Bar";
   navigation.append(p1);


   let element1=document.createElement("div");
   element1.id="element1";
   element1.innerText="Dashboard";
   navigation.append(element1);
   
  


   let element2=document.createElement("div");
    element2.id="element2";
   element2.innerText="Transactions";
   navigation.append(element2);
 

let element3=document.createElement("div");
 element3.id="element3";
   element3.innerText="Insights";
   navigation.append(element3);
   
   
   let element4=document.createElement("div");
    element4.id="element4";
   element4.innerText="History";
   navigation.append(element4);

 let divlong=document.createElement("div");
 divlong.id="divlong";
 body.append(divlong);


let store = JSON.parse(localStorage.getItem("records")) || [];
       let div2=document.createElement("div");
       div2.innerText="History";
       div2.id="div2";
        body.append(div2);
      
        let totalexpense=0;
       let totalIncome=0;
      store.forEach(item => {
       
        let div4 = document.createElement("div");
        div4.innerText = "   \t\tdetails"+"\n\ndate\t"+"\t\t:\t"+item.date+ "\nmoney\t\t:"+"\t"+item.money+"\ncategory\t\t:"+"\t"+item.category+"\ntype\t"+"\t\t:\t"+item.type;
       div4.id="div4";
       body.append(div4);
       
     if (item.type === "Income") {
    totalIncome += Number(item.money);
  } else if (item.type === "Expense") {
    totalexpense += Number(item.money);
  }
    
    })

 let deletebut = document.createElement("div");
deletebut.innerText = "Delete";
deletebut.id = "deletebut";
document.body.append(deletebut);

deletebut.addEventListener("click", function () {
    let updated = JSON.parse(localStorage.getItem("records")) || [];
    updated.splice(0, 1);  
     localStorage.setItem("records", JSON.stringify(updated));
   location.reload();
    
});
 



    let incomeDiv = document.createElement("div");
incomeDiv.innerText = "Income\n"+totalIncome;
incomeDiv.id = "income";
incomeDiv.className="one";
body.appendChild(incomeDiv);



let expensediv=document.createElement("div");
expense1=totalexpense-0;
expensediv.innerText="Expense\n"+totalexpense;
expensediv.id="expensediv";
expensediv.className="one";
body.append(expensediv);

let balancediv=document.createElement("div");
balance1=totalIncome-expense1;
balancediv.innerText="Balance\n"+balance1;
balancediv.id="balancediv";
balancediv.className="one";
body.appendChild(balancediv);


let chartContainer = document.createElement("div");
chartContainer.id="container";
chartContainer.className="one";
let canvas = document.createElement("canvas");
canvas.id = "lineChart";

chartContainer.appendChild(canvas);
body.appendChild(chartContainer);



let dates = [];
let amounts = [];

store.forEach(item => {
  dates.push(item.date);              
  amounts.push(Number(item.money));
});


new Chart(canvas, {
  type: "line",
  data: {
    labels: dates,
    datasets: [{
      label: "Money Over Time",
      data: amounts,
      fill: true,              
      tension: 0.4,            
      borderWidth: 2,
      pointRadius: 3
    }]
  },
  options: {
    responsive:false,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        title: {
          display: true,
          text: "Amount"
        },
        beginAtZero: true
      }
    }
  }
});







let pieContainer = document.createElement("div");
pieContainer.id = "pieContainer";
pieContainer.className="one";


let pieCanvas = document.createElement("canvas");
pieCanvas.id = "pieChart";

pieContainer.appendChild(pieCanvas);
body.appendChild(pieContainer);


let categoryTotals = {};

store.forEach(item => {
  if (item.type === "Expense") {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.money);
  }
});


let categories = Object.keys(categoryTotals);
let values = Object.values(categoryTotals);

new Chart(pieCanvas, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: values,

    
      backgroundColor: categories.map(() =>
        `hsl(${Math.random()*360}, 70%, 60%)`
      ),

      borderWidth: 1
    }]
  },
  options: {
    responsive: false,

    plugins: {
      legend: {
        position: "right"
      },

      title: {
        display: true,
        text: "Spending by Category",
        align: "center" 
      },

      
      datalabels: {
        color: "white",
        formatter: (value, context) => {
          let total = context.chart.data.datasets[0].data
            .reduce((a, b) => a + b, 0);

          let percentage = ((value / total) * 100).toFixed(1) + "%";
          return percentage;
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});


element2.addEventListener("click",()=>{
document.querySelectorAll(".one").forEach(el => {
  el.style.display = "none";
});
document.querySelectorAll(".three").forEach(ll => {
  ll.style.display = "none";
});


let date1=document.createElement("input");
let Transactions_detail=document.createElement("p");
Transactions_detail.innerText="Enter Transaction Details";
Transactions_detail.id="transactions";
Transactions_detail.className="two";
let para=document.createElement("p");
para.innerText="Enter Date";
para.id="para";
para.className="two";
date1.type="date";
date1.id="date";
date1.className="two";
body.prepend(Transactions_detail);
body.prepend(para);
body.prepend(date1);

let money=document.createElement("p");
money.innerText="Enter Amount";
money.id="money";
money.className="two";
body.append(money);
let moneybox=document.createElement("input");
moneybox.type="amount";
moneybox.id="moneybox";
moneybox.className="two";
body.append(moneybox);

let categoryPara=document.createElement("p");
categoryPara.innerText="Select Category";
categoryPara.id="categoryPara";
categoryPara.className="two";
let category=document.createElement("select");
category.id="category";
category.className="two";
let options1=document.createElement("option");
options1.value="Food";
options1.textContent="Food";

let options2=document.createElement("option");
options2.value="Travel";
options2.textContent="Travel";

let options3=document.createElement("option");
options3.value="Education";
options3.textContent="Education";

let options4=document.createElement("option");
options4.value="Health";
options4.textContent="Health";

let options5=document.createElement("option");
options5.value="Salary";
options5.textContent="Salary";


category.appendChild(options1);
category.appendChild(options2);
category.appendChild(options3);
category.appendChild(options4);
category.appendChild(options5);
body.append(category);
body.append(categoryPara);



let typePara=document.createElement("p");
typePara.innerText="Type";
typePara.id="typePara";
typePara.className="two";
let type=document.createElement("select");
type.id="type";
type.className="two";
let typeoption1=document.createElement("option");
typeoption1.value="Income";
typeoption1.textContent="Income";

let typeoption2=document.createElement("option");
typeoption2.value="Expense";
typeoption2.textContent="Expense";

type.appendChild(typeoption1);
type.appendChild(typeoption2);
 
body.append(type);
body.append(typePara);


let buttonAdd=document.createElement("button");
buttonAdd.innerText="Add To History";
buttonAdd.id="buttonAdd";
buttonAdd.className="two";
body.append(buttonAdd);


buttonAdd.addEventListener("click", () => {

  let store = JSON.parse(localStorage.getItem("records")) || [];


  let data = {
    date: date1.value,
    money: moneybox.value,
    category: category.value,
    type: type.value
  };

  store.push(data);
localStorage.setItem("records",JSON.stringify(store));
location.reload();
})

})


element4.addEventListener("click",()=>{
  window.scrollTo({
top:900,
behavior:"smooth"
  })
})


  


element1.addEventListener("click",()=>{
document.querySelectorAll(".two").forEach(el => {
  el.style.display = "none";
});
document.querySelectorAll(".three").forEach(ll => {
  ll.style.display = "none";
});



    let incomeDiv = document.createElement("div");
incomeDiv.innerText = "Income\n"+totalIncome;
incomeDiv.id = "income";
incomeDiv.className="one";
body.appendChild(incomeDiv);



let expensediv=document.createElement("div");
expense1=totalexpense-0;
expensediv.innerText="Expense\n"+totalexpense;
expensediv.id="expensediv";
expensediv.className="one";

body.append(expensediv);

let balancediv=document.createElement("div");
balance1=totalIncome-expense1;
balancediv.innerText="Balance\n"+balance1;
balancediv.id="balancediv";
balancediv.className="one";
body.appendChild(balancediv);


let chartContainer = document.createElement("div");
chartContainer.id="container";
chartContainer.className="one";
let canvas = document.createElement("canvas");
canvas.id = "lineChart";

chartContainer.appendChild(canvas);
body.appendChild(chartContainer);



let dates = [];
let amounts = [];

store.forEach(item => {
  dates.push(item.date);              
  amounts.push(Number(item.money));
});


new Chart(canvas, {
  type: "line",
  data: {
    labels: dates,
    datasets: [{
      label: "Money Over Time",
      data: amounts,
      fill: true,            
      tension: 0.4,            
      borderWidth: 2,
      pointRadius: 3
    }]
  },
  options: {
    responsive:false,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        title: {
          display: true,
          text: "Amount"
        },
        beginAtZero: true
      }
    }
  }
});







let pieContainer = document.createElement("div");
pieContainer.id = "pieContainer";
pieContainer.className="one";

let pieCanvas = document.createElement("canvas");
pieCanvas.id = "pieChart";

pieContainer.appendChild(pieCanvas);
body.appendChild(pieContainer);


let categoryTotals = {};

store.forEach(item => {
  if (item.type === "Expense") {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.money);
  }
});


let categories = Object.keys(categoryTotals);
let values = Object.values(categoryTotals);

new Chart(pieCanvas, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: values,

    
      backgroundColor: categories.map(() =>
        `hsl(${Math.random()*360}, 70%, 60%)`
      ),

      borderWidth: 1
    }]
  },
  options: {
    responsive: false,

    plugins: {
      legend: {
        position: "right"
      },

      title: {
        display: true,
        text: "Spending by Category",
        align: "center" 
      },

      
      datalabels: {
        color: "white",
        formatter: (value, context) => {
          let total = context.chart.data.datasets[0].data
            .reduce((a, b) => a + b, 0);

          let percentage = ((value / total) * 100).toFixed(1) + "%";
          return percentage;
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});
})



element3.addEventListener("click",()=>{
document.querySelectorAll(".one").forEach(el => {
  el.style.display = "none";
});
document.querySelectorAll(".two").forEach(tw => {
  tw.style.display = "none";
});

let barContainer = document.createElement("div");
barContainer.id = "barContainer";
barContainer.className="three";
let barCanvas = document.createElement("canvas");
barCanvas.id = "barChart";

barContainer.append(barCanvas);
document.body.append(barContainer);
let store = JSON.parse(localStorage.getItem("records")) || [];

let categoryTotals = {};

store.forEach(item => {
  if (item.type && item.type.toLowerCase() === "expense") {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.money);
  }
});


let categories = Object.keys(categoryTotals);
let values = Object.values(categoryTotals);
new Chart(barCanvas, {
  type: "bar",
  data: {
    labels: categories,
    datasets: [{
      label: "Top Spending Categories",
      data: values,

      backgroundColor: categories.map(() =>
        `hsl(${Math.random()*360}, 70%, 60%)`
      ),

      borderWidth: 1
    }]
  },
  options: {
    responsive: false,

    plugins: {
      title: {
        display: true,
        text: "Top Spending Categories",
        align: "center",
        font: {
          size: 20,       
          weight: "bold"
        }
      },

      legend: {
        display: false,
        labels: {
          font: {
            size: 14
          }
        }
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size:16
          }
        }
      },

      y: {
        title: {
          display: true,
          text: "Amount",
          font: {
            size:16
          }
        },
        ticks: {
          font: {
            size: 16
          }
        },
        beginAtZero: true
      }
    }
  }
});
})
}
   
























if(option1==select2){
    let login=document.getElementById("login");
    login.style.display="none";
     let navigation=document.createElement("div");
     navigation.id="navigation";
   let body=document.getElementById("body");
   body.append(navigation);
   
   let p1=document.createElement("p");
   p1.id="p1";
   p1.innerText="Navigation Bar";
   navigation.append(p1);


   let element1=document.createElement("div");
   element1.id="element1";
   element1.innerText="Dashboard";
   navigation.append(element1);
   
  


 
 

let element3=document.createElement("div");
 element3.id="element3";
 element3.style.position="absolute";
  element3.style.top="300px";
   element3.innerText="Insights";
   navigation.append(element3);
   
   
   let element4=document.createElement("div");
    element4.id="element4";
   element4.innerText="History";
   navigation.append(element4);

 let divlong=document.createElement("div");
 divlong.id="divlong";
 body.append(divlong);


let store = JSON.parse(localStorage.getItem("records")) || [];
       let div2=document.createElement("div");
       div2.innerText="History";
       div2.id="div2";
        body.append(div2);
        let totalexpense=0;
       let totalIncome=0;
      store.forEach(item => {
       
        let div4 = document.createElement("div");
        div4.innerText = "   \t\tdetails"+"\n\ndate\t"+"\t\t:\t"+item.date+ "\nmoney\t\t:"+"\t"+item.money+"\ncategory\t\t:"+"\t"+item.category+"\ntype\t"+"\t\t:\t"+item.type;
       div4.id="div4";
       body.append(div4);
       
     if (item.type === "Income") {
    totalIncome += Number(item.money);
  } else if (item.type === "Expense") {
    totalexpense += Number(item.money);
  }
    
    })



    let incomeDiv = document.createElement("div");
incomeDiv.innerText = "Income\n"+totalIncome;
incomeDiv.id = "income";
incomeDiv.className="one";
body.appendChild(incomeDiv);



let expensediv=document.createElement("div");
expense1=totalexpense-0;
expensediv.innerText="Expense\n"+totalexpense;
expensediv.id="expensediv";
expensediv.className="one";
body.append(expensediv);

let balancediv=document.createElement("div");
balance1=totalIncome-expense1;
balancediv.innerText="Balance\n"+balance1;
balancediv.id="balancediv";
balancediv.className="one";
body.appendChild(balancediv);


let chartContainer = document.createElement("div");
chartContainer.id="container";
chartContainer.className="one";
let canvas = document.createElement("canvas");
canvas.id = "lineChart";

chartContainer.appendChild(canvas);
body.appendChild(chartContainer);



let dates = [];
let amounts = [];

store.forEach(item => {
  dates.push(item.date);              
  amounts.push(Number(item.money));
});


new Chart(canvas, {
  type: "line",
  data: {
    labels: dates,
    datasets: [{
      label: "Money Over Time",
      data: amounts,
      fill: true,              
      tension: 0.4,            
      borderWidth: 2,
      pointRadius: 3
    }]
  },
  options: {
    responsive:false,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        title: {
          display: true,
          text: "Amount"
        },
        beginAtZero: true
      }
    }
  }
});







let pieContainer = document.createElement("div");
pieContainer.id = "pieContainer";
pieContainer.className="one";


let pieCanvas = document.createElement("canvas");
pieCanvas.id = "pieChart";

pieContainer.appendChild(pieCanvas);
body.appendChild(pieContainer);


let categoryTotals = {};

store.forEach(item => {
  if (item.type === "Expense") {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.money);
  }
});


let categories = Object.keys(categoryTotals);
let values = Object.values(categoryTotals);

new Chart(pieCanvas, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: values,

    
      backgroundColor: categories.map(() =>
        `hsl(${Math.random()*360}, 70%, 60%)`
      ),

      borderWidth: 1
    }]
  },
  options: {
    responsive: false,

    plugins: {
      legend: {
        position: "right"
      },

      title: {
        display: true,
        text: "Spending by Category",
        align: "center" 
      },

      
      datalabels: {
        color: "white",
        formatter: (value, context) => {
          let total = context.chart.data.datasets[0].data
            .reduce((a, b) => a + b, 0);

          let percentage = ((value / total) * 100).toFixed(1) + "%";
          return percentage;
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});







element4.addEventListener("click",()=>{
  window.scrollTo({
top:900,
behavior:"smooth"
  })
})

//    let deletebut=document.createElement("div");
//    deletebut.innerText="Delete";
//    deletebut.id="deletebut";
//    body.append(deletebut);

//  document.getElementById("deletebut").onclick = function () {
//   localStorage.clear(); // deletes only this
// };
//       })



element1.addEventListener("click",()=>{
document.querySelectorAll(".two").forEach(el => {
  el.style.display = "none";
});

document.querySelectorAll(".three").forEach(ll => {
  ll.style.display = "none";
});

    let incomeDiv = document.createElement("div");
incomeDiv.innerText = "Income\n"+totalIncome;
incomeDiv.id = "income";
incomeDiv.className="one";
body.appendChild(incomeDiv);



let expensediv=document.createElement("div");
expense1=totalexpense-0;
expensediv.innerText="Expense\n"+totalexpense;
expensediv.id="expensediv";
expensediv.className="one";

body.append(expensediv);

let balancediv=document.createElement("div");
balance1=totalIncome-expense1;
balancediv.innerText="Balance\n"+balance1;
balancediv.id="balancediv";
balancediv.className="one";
body.appendChild(balancediv);


let chartContainer = document.createElement("div");
chartContainer.id="container";
chartContainer.className="one";
let canvas = document.createElement("canvas");
canvas.id = "lineChart";

chartContainer.appendChild(canvas);
body.appendChild(chartContainer);



let dates = [];
let amounts = [];

store.forEach(item => {
  dates.push(item.date);              
  amounts.push(Number(item.money));
});


new Chart(canvas, {
  type: "line",
  data: {
    labels: dates,
    datasets: [{
      label: "Money Over Time",
      data: amounts,
      fill: true,            
      tension: 0.4,            
      borderWidth: 2,
      pointRadius: 3
    }]
  },
  options: {
    responsive:false,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date"
        }
      },
      y: {
        title: {
          display: true,
          text: "Amount"
        },
        beginAtZero: true
      }
    }
  }
});







let pieContainer = document.createElement("div");
pieContainer.id = "pieContainer";
pieContainer.className="one";

let pieCanvas = document.createElement("canvas");
pieCanvas.id = "pieChart";

pieContainer.appendChild(pieCanvas);
body.appendChild(pieContainer);


let categoryTotals = {};

store.forEach(item => {
  if (item.type === "Expense") {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.money);
  }
});


let categories = Object.keys(categoryTotals);
let values = Object.values(categoryTotals);

new Chart(pieCanvas, {
  type: "pie",
  data: {
    labels: categories,
    datasets: [{
      data: values,

    
      backgroundColor: categories.map(() =>
        `hsl(${Math.random()*360}, 70%, 60%)`
      ),

      borderWidth: 1
    }]
  },
  options: {
    responsive: false,

    plugins: {
      legend: {
        position: "right"
      },

      title: {
        display: true,
        text: "Spending by Category",
        align: "center" 
      },

      
      datalabels: {
        color: "white",
        formatter: (value, context) => {
          let total = context.chart.data.datasets[0].data
            .reduce((a, b) => a + b, 0);

          let percentage = ((value / total) * 100).toFixed(1) + "%";
          return percentage;
        }
      }
    }
  },
  plugins: [ChartDataLabels]
});
})



element3.addEventListener("click",()=>{
document.querySelectorAll(".one").forEach(el => {
  el.style.display = "none";
});
document.querySelectorAll(".two").forEach(tw => {
  tw.style.display = "none";
});


let barContainer = document.createElement("div");
barContainer.id = "barContainer";
barContainer.className="three";
let barCanvas = document.createElement("canvas");
barCanvas.id = "barChart";

barContainer.append(barCanvas);
document.body.append(barContainer);
let store = JSON.parse(localStorage.getItem("records")) || [];

let categoryTotals = {};

store.forEach(item => {
  if (item.type && item.type.toLowerCase() === "expense") {
    if (!categoryTotals[item.category]) {
      categoryTotals[item.category] = 0;
    }
    categoryTotals[item.category] += Number(item.money);
  }
});

// convert to arrays
let categories = Object.keys(categoryTotals);
let values = Object.values(categoryTotals);
new Chart(barCanvas, {
  type: "bar",
  data: {
    labels: categories,
    datasets: [{
      label: "Top Spending Categories",
      data: values,

      backgroundColor: categories.map(() =>
        `hsl(${Math.random()*360}, 70%, 60%)`
      ),

      borderWidth: 1
    }]
  },
  options: {
    responsive: false,

    plugins: {
      title: {
        display: true,
        text: "Top Spending Categories",
        align: "center",
        font: {
          size: 20,       
          weight: "bold"
        }
      },

      legend: {
        display: false,
        labels: {
          font: {
            size: 14
          }
        }
      }
    },

    scales: {
      x: {
        title: {
          display: true,
          text: "Categories",
          font: {
            size: 16
          }
        },
        ticks: {
          font: {
            size:16
          }
        }
      },

      y: {
        title: {
          display: true,
          text: "Amount",
          font: {
            size:16
          }
        },
        ticks: {
          font: {
            size: 16
          }
        },
        beginAtZero: true
      }
    }
  }
});
})
}

 })
