
console.log('Client side file is loaded');
// http request with fetch
// fetch('http://puzzle.mead.io/puzzle')
//     .then(function (response)
//     {
//         response.json()
//             .then(function (data)
//             {
//                 console.log(data);
//             });
//     });

// fetch('http://localhost:3000/weather?address=sylhet')
//     .then(function (response)
//     {
//         response.json()
//             .then(function (weatherData)
//             {
//                 if (weatherData.error) {
//                     console.log(weatherData.error);
//                 }
//                 else {
//                     console.log(weatherData.forecast.temperature);
//                 }
//             });
//     });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', function (event)
{
    event.preventDefault();
    const location = search.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch('/weather?address=' + location)
        .then(function (response)
        {
            response.json()
                .then(function (weatherData)
                {
                    if (weatherData.error) {
                        messageOne.textContent = weatherData.error;
                    }
                    else {
                        messageOne.textContent = weatherData.location;
                        messageTwo.textContent = weatherData.forecast;
                    }
                });
        });
})