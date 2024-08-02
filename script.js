        // JavaScript to fetch data from Codeforces API and display it
        async function fetchContests() {
            const apiUrl = 'https://codeforces.com/api/contest.list?gym=false&count=15'; // Excluding gym contests and fetching only 15 recent contests
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                displayContests(data.result);
            } catch (error) {
                console.error('Error fetching contests:', error);
            }
        }
        

        function displayContests(contests) {
            // Truncate the contests array to include only the first 15 contests
            contests = contests.slice(0, 15);
        
            const contestsContainer = document.getElementById('contests');
            contests.forEach(contest => {
                const { name, startTimeSeconds, durationSeconds, phase, type } = contest;
                if (phase === 'BEFORE' && type !== 'CF') return; // Skip past contests and contests not hosted by Codeforces
                const startTime = new Date(startTimeSeconds * 1000).toLocaleString();
                const endTime = new Date((startTimeSeconds + durationSeconds) * 1000).toLocaleString();
                const durationHours = durationSeconds / 3600;
                const durationString = `${durationHours} hours`;
        
                // Create elements
                const contestItem = document.createElement('div');
                contestItem.classList.add('contest-item');
        
                const title = document.createElement('h2');
                title.textContent = name;
        
                const startTimePara = document.createElement('p');
                startTimePara.innerHTML = `<strong>Start Time:</strong> ${startTime}`;
        
                const endTimePara = document.createElement('p');
                endTimePara.innerHTML = `<strong>End Time:</strong> ${endTime}`;
        
                const durationPara = document.createElement('p');
                durationPara.innerHTML = `<strong>Duration:</strong> ${durationString}`;
        
                const phasePara = document.createElement('p');
                phasePara.innerHTML = `<strong>Phase:</strong> ${phase}`;
        
                // Append elements
                contestItem.appendChild(title);
                contestItem.appendChild(startTimePara);
                contestItem.appendChild(endTimePara);
                contestItem.appendChild(durationPara);
                contestItem.appendChild(phasePara);
        
                contestsContainer.appendChild(contestItem);
            });
        }
        

        // Fetch contests when the page loads
        window.onload = fetchContests;
    //{"id":1974,"name":"Codeforces Round (Div. 3)","type":"ICPC","phase":"BEFORE","frozen":false,"durationSeconds":8100,"startTimeSeconds":1716217500,"relativeTimeSeconds":-956409}