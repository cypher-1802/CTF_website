const form = document.getElementById('form1');
const verdictDiv = document.getElementById('verdict');

form.addEventListener('submit', async (event)=>{
    event.preventDefault();

    const answer = document.getElementById('flag').value;

    try{
        const response = await fetch('/question/submit',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({answer})
        });

        const data = await response.json();
        const verdict = data.isCorrect ? 'Correct':'Incorrect';
        verdictDiv.textContent = verdict;
    }catch(error){
        console.log(error);
    }
})