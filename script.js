const tableBody = document.getElementById('table-body');
const themeBox = document.getElementById('theme');

const updateData = (data) => {

    tableBody.innerHTML = "";

    for(let idx in data){
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${Number.parseInt(idx)+1}</td>
        <td>${data[idx].name}</td>
        <td>₹${data[idx].last}</td>
        <td>₹${data[idx].buy} / ₹${data[idx].sell}</td>
        <td>${data[idx].volume}</td>
        <td>${data[idx].base_unit.toLocaleUpperCase()}</td>
        `

        tableBody.append(row);
    }
}

const fetchData = async () => {
    try{
        await fetch('http://localhost:5000/api/fetchData');
        const res = await fetch('http://localhost:5000/api/getData');
        const res2 = await res.json();
        const data = res2.data;
        updateData(data);
    }
    catch(error){
        console.log(error.message)
    }
}

const swatch = themeBox.children[0];

swatch.addEventListener('click', () => {
    swatch.classList.toggle('on');
    const root = document.documentElement;

    if(swatch.classList.contains('on')){
        root.style.setProperty('--bgco1', '#191d28');
        root.style.setProperty('--bgco2', '#2c3344');
        root.style.setProperty('--maco1', 'white');
    }
    else{
        root.style.setProperty('--bgco1', 'white');
        root.style.setProperty('--bgco2', '#d0d0d0');
        root.style.setProperty('--maco1', 'black');
    }
})

const circularProgress = document.querySelectorAll(".circular-progress");

Array.from(circularProgress).forEach((progressBar) => {
    const progressValue = progressBar.querySelector(".percentage");
    const innerCircle = progressBar.querySelector(".inner-circle");
    let endValue = 0,
        startValue = Number(progressBar.getAttribute("data-percentage")),
        speed = 1000,
        progressColor = progressBar.getAttribute("data-progress-color");

    fetchData();

    const progress = setInterval(() => {
        startValue--;
        progressValue.textContent = `${startValue}`;
        progressValue.style.color = `${progressColor}`;

        innerCircle.style.backgroundColor = `${progressBar.getAttribute(
            "data-inner-circle-color"
        )}`;

        progressBar.style.background = `conic-gradient(${progressColor} ${startValue * 6}deg,${progressBar.getAttribute("data-bg-color")} 0deg)`;

        if (startValue === endValue) {
            fetchData();
            startValue = 60;
        }
    }, speed);
});
