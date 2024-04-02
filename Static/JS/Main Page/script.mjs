async function fetchRailData() {
  const boardingStation = encodeURIComponent(document.getElementById('boardingStation').value);
  const destinationStation = encodeURIComponent(document.getElementById('destinationStation').value);
  const url = `http://localhost:80/${boardingStation}-to-${destinationStation}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // Select the container for your train data
      let trainDataContainer = document.getElementsByClassName('main')[0];
      trainDataContainer.innerHTML = ''; // Clear any existing content;

      for (let i = 0; i < data.length; i++) {
        const trainInfo = data[i];

        // Create a train data div
        const trainDataDiv = document.createElement('div');
        trainDataDiv.classList.add('trainDataDiv', 'primary-flex', 'align-center', 'border-bottom', 'margin-main');

        // Create elements for the train information
        const nameNumber = document.createElement('div');
        nameNumber.classList.add('name-number', 'float-50', 'nav-font-large', 'mar-right-high');

        const imgDataWrapper = document.createElement('div');
        imgDataWrapper.classList.add('img-data-wrapper', 'primary-flex', 'width-content');

        const imgLogo = document.createElement('img');
        imgLogo.classList.add('image-logo', 'mar-right');
        imgLogo.src = '../Static/Static Images/Viator-Logo-V.jpg';

        const dataTrain = document.createElement('div');
        dataTrain.classList.add('data-train');

        // Set text content for the first set of elements
        const themeColor = document.createElement('p');
        themeColor.classList.add('theme-color');
        themeColor.textContent = trainInfo['Train '];

        const stationColor = document.createElement('p');
        stationColor.classList.add('station-color');
        stationColor.textContent = trainInfo['Boarding Station'];

        const dateColor = document.createElement('p');
        dateColor.classList.add('date-color');
        dateColor.textContent = trainInfo['Start Time'];

        // Set text content for the second set of elements
        const nameNumberSecond = document.createElement('div');
        nameNumberSecond.classList.add('name-number', 'float-50', 'low-cap-font', 'font-size-big', 'primary-grid', 'justify-end');
        const themeColorSecond = document.createElement('p');
        themeColorSecond.classList.add('theme-color');
        themeColorSecond.textContent = ' ';

        const stationColorSecond = document.createElement('p');
        stationColorSecond.classList.add('station-color', 'primary-flex', 'justify-end');
        stationColorSecond.textContent = trainInfo['Destination Station'];

        const dateColorSecond = document.createElement('p');
        dateColorSecond.classList.add('date-color');
        dateColorSecond.textContent = trainInfo['End Time'];

        // Book-NOW div:
        const BookNOW = document.createElement('div');
        BookNOW.className = 'Book-NOW';

        const addSubtract = document.createElement('div');
        addSubtract.classList.add('add-subtract', 'float-33', 'justify-left', 'primary-flex');

        // Counter elements
        let count = 0; // Initialize count for each train
        let availableCount = 100; // Initialize available count for each train

        const countDisplay = document.createElement('p');
        countDisplay.classList.add('BOOK', 'count');
        countDisplay.textContent = count;

        const incrementButton = document.createElement('button');
        incrementButton.classList.add('BOOK', 'float-33', 'justify-center', 'add');
        incrementButton.textContent = '+1';

        const decrementButton = document.createElement('button');
        decrementButton.classList.add('BOOK', 'float-33', 'justify-center', 'subtract');
        decrementButton.textContent = '-1';

        addSubtract.appendChild(decrementButton);
        addSubtract.appendChild(countDisplay);
        addSubtract.appendChild(incrementButton);

        // "Book Now" button
        const databaseCode = trainInfo['DB Code'];
        const bookNowButton = document.createElement('a');
        bookNowButton.classList.add('BOOK', 'float-50','width-content','justify-center', 'book-now');
        bookNowButton.setAttribute('href',`/${databaseCode}`);
        bookNowButton.textContent = 'Book Now';

        // Available count element
        const available = document.createElement('div');
        available.classList.add('available', 'float-50', 'justify-end', 'primary-flex', 'align-center');
        const availableBtn = document.createElement('button');
        availableBtn.classList.add('BOOK');
        availableBtn.textContent = `Available: ${trainInfo['Available']}`;

        available.appendChild(availableBtn);

        // Append elements to their parent containers
        imgDataWrapper.appendChild(imgLogo);
        dataTrain.appendChild(themeColor);
        dataTrain.appendChild(stationColor);
        dataTrain.appendChild(dateColor);

        nameNumber.appendChild(imgDataWrapper);
        nameNumber.appendChild(dataTrain);

        nameNumberSecond.appendChild(themeColorSecond);
        nameNumberSecond.appendChild(stationColorSecond);
        nameNumberSecond.appendChild(dateColorSecond);

        trainDataDiv.appendChild(nameNumber);
        trainDataDiv.appendChild(nameNumberSecond);

        BookNOW.appendChild(bookNowButton);
        BookNOW.appendChild(available);

        trainDataContainer.appendChild(trainDataDiv);
        trainDataContainer.appendChild(BookNOW);
      }
    } else {
      console.error(`Request failed with status: ${response.status}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
