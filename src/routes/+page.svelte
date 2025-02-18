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
        { name: "FSUK Lap Time Sim Rules Released + Reg Opens", date: "08/04/2025 17:00" },
        { name: "FSUK Impact Attenuator Data (IAD) Due In", date: "27/04/2025 17:00" },
        { name: "FSUK LTS License Registration Requests Deadline", date: "08/05/2025 17:00" },
        { name: "FSUK Engineering Design Report (EDR) Deadline", date: "12/05/2025 17:00" },
        { name: "FSG Design Spec Sheet (DSS) + EDR + MU Deadline 1PM CEST [CHECK TIMEZONES]", date: "06/06/2025 12:00"},
        { name: "FSUK Design Spec Sheet (DSS) Deadline", date: "12/05/2025 17:00"},
        { name: "FSUK EV Protocols Document Due In", date: "13/06/2025 17:00" },
        { name: "FSUK Cost Report Document Due In", date: "16/06/2025 17:00" },
        { name: "FSUK LTS Final Vehicle Model Submission + Validation Test Plan Due In", date: "16/06/2025 17:00"},
        { name: "FSUK Pre-Scruti Form Due In", date: "20/06/2025 17:00" },
        { name: "FS Portugal Cost Submission [1PM CEST] CHECK TIMEZONE ", date: "16/07/2025 12:00"},
        { name: "FS Germany Cost Submission [1PM CEST] CHECK TIMEZONE", date: "01/08/2025 12:00"},


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
            } else if (days <= 14) {
                color = 'orange';  // Event is approaching
            } else {
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

    .green {
        background-color: green;
    }

    .orange {
        background-color: orange;
    }

    .red {
        background-color: red;
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
