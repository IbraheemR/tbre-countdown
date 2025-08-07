<script xmlns="http://www.w3.org/1999/html">
    import { onMount, onDestroy } from 'svelte';

    // Array of events with name and date in d/m/y h:m format
    let events = [

        { name: "FSUK Design Concept Specification (DCS) Due", date: "06/12/2024 17:00" },
        // { name: "Soon Test", date: "04/02/2025 10:00" },
        { name: "FSUK SES Due In", date: "07/02/2025 17:00" },
        { name: "FSUK Electrical Safety Officer+Advisor Form Due In", date: "07/02/2025 17:00" },
        { name: "INTERNAL TBRe AERO DESIGN FREEZE", date: "28/02/2025 17:00" },
        { name: "FSG SES/ASES/IAD/SESA/SE3D/CTS Due In", date: "14/03/2025 12:00" },
        { name: "FSUK Electrical Systems Form (ESF) Due In", date: "21/03/2025 17:00" },
        { name: "FSG Electrical System Form (ESF) Due In 1PM CET [CHECK TIMEZONES]", date: "28/03/2025 12:00" },
        { name: "FSUK AI Autonomous System Form (ASF) Due In", date: "31/03/2025 17:00" },
        { name: "FSUK Lap Time Sim Rules Released + Reg Opens", date: "08/04/2025 17:00" },
        { name: "FSUK Impact Attenuator Data (IAD) Due In", date: "27/04/2025 17:00" },
        { name: "FSUK LTS License Registration Requests Deadline", date: "08/05/2025 17:00" },
        { name: "FSUK AI Autonomous Design Report Due In", date: "08/05/2025 17:00" },
        { name: "FSUK Engineering Design Report (EDR) and Design Spec Sheet (DSS) Deadline", date: "12/05/2025 17:00" },
        { name: "FSUK AI Design Specification Sheet Due In", date: "12/05/2025 17:00" },
        { name: "INTERNAL COSTING DEADLINE", date: "18/05/2025 17:00" },
        { name: "FSUK AI Event Programme Images Due In", date: "24/05/2025 17:00"},
        { name: "FSUK AI System Status Report Due In", date: "29/05/2025 17:00"},
        { name: "FSG Design Spec Sheet (DSS) + EDR + MU Deadline 1PM CEST [CHECK TIMEZONES]", date: "06/06/2025 12:00"},
        { name: "FSUK EV Protocols Document Due In", date: "13/06/2025 17:00" },
        { name: "FSUK Cost Report Document Due In", date: "16/06/2025 17:00" },
        { name: "FSUK LTS Final Vehicle Model Submission + Validation Test Plan Due In", date: "16/06/2025 17:00"},
        { name: "FSUK Pre-Scruti Form Due In", date: "20/06/2025 17:00" },

        // From https://www.formulastudent.pt/_files/ugd/169cc9_a86574853ec745b2bc2650e5ef55a97c.pdf
        { name: "[FSPT 1PM CEST] ESO Qualification (ESOQ) Due In", date: "21/06/2025 12:00"},

        //Ellecy
        {name: "ELEC Begin Spin on Stands on TBRe24", date: "23/06/2025 10:00"},

        // Fedes:
        {name: "FSUK SES Self-initiated Resubmission Due In", date: "23/06/2025 17:00"},
        {name: "FSG SES V4 Resubmission Due In", date: "25/06/2025 10:00"},

        //LAUNCH
        {name: "**CAR LAUNCHES**", date: "27/06/2025 10:00"},

        // More FSPT
        { name: "[FSPT 1PM CEST] Vehicle Status Video (VSV) Due In", date: "05/07/2025 12:00"},
        { name: "[FSPT 1PM CEST] COSTING REPORT DOCUMENT (CRD) Due In", date: "16/07/2025 12:00"},
        { name: "[FSPT 1PM CEST] EMAIL FSPT NO DV EVENTS (PT2.9)", date: "16/07/2025 12:00"},


        { name: "FS Germany Cost Submission [1PM CEST] CHECK TIMEZONE", date: "01/08/2025 12:00"},


        // FSG and onwards

        { name: "Car must be operational for first day of testing", date:"11/08/2025 11:00"},
        { name: "Car, Tools and camping kit must be packed into Lutons", date: "16/08/2025 17:00"},
        { name: "Luton's leave for Germany! (Huw's Rampage)", date: "17/08/2025 00:01"},




        //{ name: "Car finished", date: "10/05/2025 10:00" },  // Far away
        //{ name: "Today", date: "03/02/2025 14:30" },  // Close
        //{ name: "Past Event", date: "01/01/2025 00:00" },    // Already passed
        //{ name: "Past Event 2 will vanish", date: "03/02/2020 16:01" }



    ];

    // Function to update countdown and determine color based on proximity
    function updateCountdown(eventDateString) {
        const now = new Date();

        const [dateString, timeString] = eventDateString.split(' ')
        const [day, month, year] = dateString.split('/')
        const [hour, minute] = timeString.split(':')
        const event = new Date(+year, +month - 1, +day, +hour, +minute)

        //console.log(event);

        const timeDifference = event - now;
        let timeLeft = "";
        let bottomline = "until";
        let color = "green";

        //console.log("Due:", event, "Difference:", timeDifference);

        if (timeDifference <= 0) {
            timeLeft = `${event.toLocaleDateString("gb-uk", { weekday: 'short' })} ${eventDateString}`;
            bottomline = "was the deadline for"
            color = "grey";
        } else {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
            const milliseconds = timeDifference % 1000;  // Get the milliseconds

            // Format milliseconds to always show 4 digits
            const formattedMilliseconds = String(milliseconds).padStart(3, '0');

            timeLeft = `${days}d ${hours}h ${minutes}m ${seconds}s ${formattedMilliseconds}ms`;

            // Color logic based on proximity to event
            if (days <= 0 && hours <= 24) {
                color = 'red';  // Event is very close
            }
            else if (days <= 5) {
                color = 'orange';  // Event is approaching
            }
            else if (days <= 10){
                color = 'yellow';
            }
            else {
                color = 'green';  // Event is far away
            }
        }

        return {timeLeft, color, bottomline, timeDifference};
    }

    // Function to remove events that have passed for at least a day
    function cleanUpEvents() {
        const now = new Date();
        events = events.filter(event => {
            const { timeDifference } = updateCountdown(event.date);

            // console.log("Time:", timeDifference);
            // Remove events only if they are in the past for more than a day
            if (timeDifference < 0) {
                return timeDifference > -172800000;  // Return false if the time elapsed is greater than two days
            }

            // Keep future events
            return true;
        });
    }

    // Update countdown every second
    let interval;

    onMount(() => {
        interval = setInterval(() => {
            // Force an update by recalculating countdown for all events
            cleanUpEvents(); // Remove ones older than two days
            events = [...events];  // Trigger reactive update
        }, 1); // Recalculate every 1 millisecond

        return () => clearInterval(interval);  // Clean up on component destroy
    });
</script>

<style>

    /* Import TTF font from a web URL */
    @font-face {
        font-family: 'ComicMono';
        src: url('https://dtinth.github.io/comic-mono-font/ComicMono.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    .countdown {
        padding: 10px;
        border-radius: 5px;
        color: white;
        margin-bottom: 10px;
        margin-left: 30px;
        margin-right: 30px;
        font-family: "ComicMono", "Comic Sans", cursive;
    }

    mark {
        background-color: black;
        color: white;
    }

    .green {
        background-color: green;
    }

    .orange {
        background-color: #e86609;
    }

    .yellow {
        background-color: #eddc1d;
    }

    .red {
        /*background-color: red;*/
        background-image: url('https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2hnMzdhNXhuMWIxa242YWdmZ3d5MHN6NGF2OTIzYndxcnF3NW1kciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oeSAQoA5PLG4jLTos/giphy.gif');
        background-size: 300px 200px; /* Resize the GIF to 50px by 50px */
        background-repeat: repeat; /* Tiling the GIF horizontally and vertically */
        background-position: top left; /* Optional: starts the tiling from the top-left corner */
        font-weight: bold;
        color: red;
        text-shadow: 6px 6px 5px rgba(0, 0, 0, 0.8);
        letter-spacing: 1.5px;
    }

    .grey {
        background-color: gray;
        color: black;
    }
</style>

<div>
    <p style="font-size: 40pt; font-weight: bold; text-decoration: underline; text-align: center;">Upcoming FS Deadlines</p>
    {#each events as event}
        <div style="font-size: 50pt; text-align: center;" class="countdown {updateCountdown(event.date).color}">

            <p>{updateCountdown(event.date).timeLeft}</p>
            <p style="font-size: 20pt; margin-top: -10pt;">{updateCountdown(event.date).bottomline} {event.name}</p>
        </div>
    {/each}
</div>
