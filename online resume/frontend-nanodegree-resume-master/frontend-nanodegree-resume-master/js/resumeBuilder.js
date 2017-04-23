var bio = {
    "name": "Ankush Chadha",
    "role": "Front-End Web Developer",
    "contacts": {
        "email": "ankushchadha3@gmail.com",
        "mobile": "8054751278",
        "github": "ankushchadha96",
        "twitter": "@ankush8100",
        "location": "Punjab"
    },
    "welcomeMessage": "Take time to be kind",
    "skills": ["JAVA", "C++", "C", "CSS", "HTML", "Javascript", "Bootstrap"],
    "biopic": "images/mypic.jpg"
};
var education = {
    "schools": [
        {
            "name": "Chitkara University",
            "location": "Rajpura,Punjab",
            "degree": "BE",
            "majors": ["CS"],
            "dates": "2014-2018",
            "url" : "#"

        }

    ],
    "onlineCourses": [
        {
            "title": "JavaScript Basics",
            "school": "Udacity",
            "dates": "2017",
            "url": "https://www.udacity.com/courses/javascript-basics--ud804"
        }
    ]
};
var work = {
    "jobs": [
        {
            "employer": "Chitkara University",
            "title": "Student",
            "dates": "2014-2018",
            "description": "Pursuing BE in Cse",
            "location": "Punjab"
        }
    ]
};
work.display = function () {

    for (var job = 0; job < work.jobs.length; job++) { //job in work.jobs) {
        $("#workExperience").append(HTMLworkStart);

        var formattedEmployer = HTMLworkEmployer.replace("%data%", work.jobs[job].employer);
        var formattedTitle = HTMLworkTitle.replace("%data%", work.jobs[job].title);
        var formattedEmployerTitle = formattedEmployer + formattedTitle;
        $(".work-entry:last").append(formattedEmployerTitle);

        var formattedDates = HTMLworkDates.replace("%data%", work.jobs[job].dates);
        $(".work-entry:last").append(formattedDates);

        var formattedDescription = HTMLworkDescription.replace("%data%", work.jobs[job].description);
        $(".work-entry:last").append(formattedDescription);
        var formattedLocation = HTMLworkLocation.replace("%data%", work.jobs[job].location);
        $(".work-entry:last").append(formattedLocation);
    }
};
work.display();


bio.display = function () {
    $("#header").prepend(HTMLbioPic.replace("%data%", bio.biopic));
    $("#header").prepend(HTMLheaderName.replace("%data%", bio.name), HTMLheaderRole.replace("%data%", bio.role));
    $("#header").append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));
    formattedContactInfo = [];
    formattedContactInfo.push(HTMLmobile.replace('%data%', bio.contacts.mobile));
    formattedContactInfo.push(HTMLemail.replace('%data%', bio.contacts.email));
    formattedContactInfo.push(HTMLgithub.replace('%data%', bio.contacts.github));
    formattedContactInfo.push(HTMLtwitter.replace('%data%', bio.contacts.twitter));
    formattedContactInfo.push(HTMLlocation.replace('%data%', bio.contacts.location));

    if (bio.skills.length > 0) {
        $("#header").append(HTMLskillsStart);

        for (var i = 0; i < bio.skills.length; i++) {
            $("#skills").append(HTMLskills.replace("%data%", bio.skills[i]));
        }

    }
    for (k in formattedContactInfo) {

        $("#topContacts").append(formattedContactInfo[k]);
        $("#footerContacts").append(formattedContactInfo[k]);



    }


};
bio.display();


education.display = function () {
    for (var i = 0; i < education.schools.length; i++) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLschoolName.replace("%data%", education.schools[i].name) +
            HTMLschoolDegree.replace("%data%", education.schools[i].degree),
            HTMLschoolDates.replace("%data%", education.schools[i].dates),
            HTMLschoolLocation.replace("%data%", education.schools[i].location),
            HTMLschoolMajor.replace("%data%", education.schools[i].majors));
    }

    $("#education").append(HTMLonlineClasses);

    for (var course = 0; course < education.onlineCourses.length; course++) {
        $("#education").append(HTMLschoolStart);
        $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", education.onlineCourses[course].title) + HTMLonlineSchool.replace("%data%", education.onlineCourses[course].school), HTMLonlineDates.replace("%data%", education.onlineCourses[course].dates), HTMLonlineURL.replace("%data%", education.onlineCourses[course].url).replace("#", education.onlineCourses[course].url));
    }
};
education.display();

$(document).click(function (loc) {
    var x = loc.pageX;
    var y = loc.pageY;
    logClicks(x, y);
});



var projects = {

    "projects": [
        {
            "title": " My portfolio",
            "dates": "Semester 6<sup>th</sup> 2017",
            "description": "It is a responsive portfolio page  as a part of Nano Degree made using Bootstrap.",
            "images": ["images/portfolio.png"]
        },

        {
            "title": "Online Web Portal",
            "dates": "Semester 4<sup>th</sup> 2016",
            "description": "During examinations studend can actually go through the previous years question papers.I made it using HTML,PHP,CSS,",
            "images": ["images/poste1.png"]
        },

        {
            "title": "Gluttonous Snake",
            "dates": "Semester 2<sup>nd</sup> 2015",
            "description": "A project in C++ using Dijkastra Algorithm where user can play game by blocking snake path by -1 then snake will automatically decide how to reach to finish line having high score using short path.",
            "images": ["images/automatic.jpg"]
        },

     ]
};


projects.display = function () {

    for (var project = 0; project < projects.projects.length; project++) {
        $("#projects").append(HTMLprojectStart);
        $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", projects.projects[project].title), HTMLprojectDates.replace("%data%", projects.projects[project].dates) + HTMLprojectDescription.replace("%data%", projects.projects[project].description));

        if (projects.projects[project].images.length > 0) {
            //for (var image in projects.projects[project].images)
            for (var image = 0; image < projects.projects[project].images.length; image++)
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", projects.projects[project].images[image]));
        }
    }
};

projects.display();
$("#mapDiv").append(googleMap);
