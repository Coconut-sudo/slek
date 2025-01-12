const API_KEY = 'AIzaSyDP-PI__wBgKo2OblplKbAjYZ8GuplEYQs';
const SPREADSHEET_ID = '1-hJK3fx7VWQov16weyJOZq8bq08eTzK4H91qrqowY2M';
const ELECTIVE_RANGE = '正式選課結果!A:J';
const inputarea = document.querySelector(".inputarea");
const keyin = document.querySelector(".keyin");
const keyinarea = document.querySelector(".keyinarea");

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        loadStudentSchedule();
    }
}

function loadStudentSchedule() {
    const studentId = document.getElementById('student_id').value.trim();
    console.log("Student ID entered:", studentId);  // Log the student ID
    
    if (!studentId) {
        alert("請輸入學號");
        return;
    }

    document.querySelector('h1').style.display = 'none';
    document.getElementById('student_id').style.display = 'none';
    document.querySelector('button').style.display = 'none';
    // document.getElementsByClassName('.inputarea').style.display = 'none';

    console.log("Loading Google Sheets API...");
    gapi.load('client', initClient);

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
        }).then(() => {
            console.log("Google Sheets API initialized");
            return gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: SPREADSHEET_ID,
                range: ELECTIVE_RANGE,
            });
        }).then(response => {
            console.log("Data retrieved from Google Sheets:", response);
            const electiveCourses = response.result.values || [];

            // Check if the student ID exists in the sheet
            const studentExists = electiveCourses.some(row => row[0] === studentId);

            if (!studentExists) {
                document.getElementById('content').innerHTML = "此學號未選課/不存在，請先進選課系統完成選課喔！";
                return;
            }

            renderTimetable(electiveCourses, studentId);
            document.getElementsByClassName("before")[0].classList.add("after")
            document.getElementsByClassName("before")[0].classList.remove("before")
        }).catch(error => {
            // Improved error handling
            console.error('Error details:', error);
            const errorMessage = error?.result?.error?.message || '無法加載資料，請稍後再試。';
            console.error('Error fetching data:', errorMessage);
            document.getElementById('content').innerHTML = errorMessage;
        });
    }
}

function renderTimetable(electiveCourses, studentId) {
    console.log("Rendering timetable with data:", electiveCourses);

    // let html = '<table border="1"><tr><th>時間</th><th>1/20(一)</th><th>1/21(二)</th><th>1/22(三)</th><th>1/23(四)</th><th>1/24(五)</th></tr>';
    let introduction = "<b>自習</b><br>(教室 B)";
    let english = "<b>自習</b><br>(教室 B)";
    let interview = "<b>自習</b><br>(教室 B)";
    let parasitology = "<b>微生物學</b><br>(教室 B)";
    let parasitology_report = "<b>微生物學報告</b><br>(教室 B)";
    let CT = "<b>醫病溝通</b><br>(教室 B)";
    let ppt = "<b>程式也能很有趣：Coding 的奇幻世界</b><br>(教室 B)";
    let ppt2 = "<b>程式也能很有趣：Coding 的奇幻世界</b><br>(教室 B)";
    let question = "<b>自習</b><br>(教室 B)";
    let openmic = "<b>自習</b><br>(教室 B)";

    electiveCourses.forEach((row) => {
        const studentIdInSheet = row[0];
        
        if (studentIdInSheet === studentId) {
            for (let i = 1; i < row.length; i++) {
                const course = row[i];
                console.log("Checking course:", course); // Log each course

                if (course && course.includes("消化系統概論")) {
                    introduction = "<b>消化系統概論</b><br>(教室 A)";
                }
                if (course && course.includes("醫用英文")) {
                    english = "<b>醫用英文</b><br>(教室 A)";
                }
                if (course && course.includes("寄生蟲學")) {
                    parasitology = "<b>寄生蟲學</b><br>(教室 A)";
                    console.log("Found '寄生蟲學', setting parasitology");
                }
                if (course && course.includes("寄生蟲學報告")) {
                    parasitology_report = "<b>寄生蟲學報告</b><br>(教室 A)";
                }
                if (course && course.includes("從面試到講台：展現自己的秘密")) {
                    interview = "<b>從面試到講台：展現自己的秘密</b><br>(教室 A)";
                    }
                if (course && course.includes("臨床 CT 影像判讀")) {
                    CT = "<b>臨床 CT 影像判讀</b><br>(教室 A)";
                }
                if (course && course.includes("科系大哉問")) {
                    question = "<b>科系大哉問</b><br>(教室 A)";
                }
                if (course && course.includes("醫學 Open mic")) {
                    openmic = "<b>醫學 Open mic</b><br>(教室 A)";
                }
                if (course && course.includes("跳脫內建模板：簡報製作終極指南")) {
                    ppt = "<b>跳脫內建模板：簡報製作終極指南</b><br>(教室 A)";
                    ppt2 = "<b>跳脫內建模板：簡報製作終極指南</b><br>(教室 A)";
                } 


            }
        }
    });

//     if (introduction = "<b>自習</b><br>(教室 B)") {
//     document.getElementById('introduction').style.display = 'rest'
// };
    // html += '</table>';
    // document.getElementById('content').innerHTML = html;

    document.getElementById('introduction').innerHTML = introduction;
        if(introduction.indexOf("自習")!== -1){
            document.getElementById('introduction').parentNode.classList.add("rest");
        } else {
            document.getElementById('introduction').parentNode.classList.add("fund");
        }
    document.getElementById('english').innerHTML = english;
        if(english.indexOf("自習")!== -1){
            document.getElementById('english').parentNode.classList.add("rest");
        } else {
            document.getElementById('english').parentNode.classList.add("fund");
        }
    document.getElementById('interview').innerHTML = interview;
        if(interview.indexOf("自習")!== -1){
            document.getElementById('interview').parentNode.classList.add("rest");
        } else {
            document.getElementById('interview').parentNode.classList.add("interest");
        }
    document.getElementById('parasitology').innerHTML = parasitology;
    document.getElementById('parasitology_report').innerHTML = parasitology_report;
    document.getElementById('CT').innerHTML = CT;
    document.getElementById('ppt').innerHTML = ppt;
    document.getElementById('ppt2').innerHTML = ppt2;
    document.getElementById('question').innerHTML = question;
        if(question.indexOf("自習")!== -1){
            document.getElementById('question').parentNode.classList.add("rest");
        } else {
            document.getElementById('question').parentNode.classList.add("life");
        }
    document.getElementById('openmic').innerHTML = openmic;
        if(openmic.indexOf("自習")!== -1){
            document.getElementById('openmic').parentNode.classList.add("rest");
        } else {
            document.getElementById('openmic').parentNode.classList.add("life");
        }
}

