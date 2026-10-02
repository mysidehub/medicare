/* =====================================================
   MEDICARE HOSPITAL - JAVASCRIPT
===================================================== */


/* =====================================================
   IMPORTANT WHATSAPP NUMBER
===================================================== */


const hospitalWhatsApp = "919315330320";


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    const navbar = document.getElementById("navbar");

    navbar.classList.toggle("show");

}


/* Close mobile menu after clicking nav link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        document.getElementById("navbar")
            .classList.remove("show");

    });

});


/* =====================================================
   THEME
===================================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

    const icon = document.getElementById("themeIcon");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("hospitalTheme", "dark");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("hospitalTheme", "light");

    }

}


/* Load saved theme */

if (localStorage.getItem("hospitalTheme") === "dark") {

    document.body.classList.add("dark");

    const icon = document.getElementById("themeIcon");

    if (icon) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    }

}


/* =====================================================
   MODAL
===================================================== */

function openModal(id) {

    const modal = document.getElementById(id);

    if (modal) {

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    }

}


function closeModal(id) {

    const modal = document.getElementById(id);

    if (modal) {

        modal.classList.remove("show");

        document.body.style.overflow = "";

    }

}


/* =====================================================
   APPOINTMENT MODAL
===================================================== */

function openAppointmentModal() {

    openModal("appointmentModal");

}


/* Minimum date = today */

const appointmentDate =
    document.getElementById("appointmentDate");

if (appointmentDate) {

    const today =
        new Date().toISOString().split("T")[0];

    appointmentDate.min = today;

}


/* =====================================================
   DOCTOR LIST
===================================================== */

const doctors = [

    {
        name: "Dr. Rajesh Sharma",
        department: "Cardiology"
    },

    {
        name: "Dr. Priya Mehta",
        department: "Neurology"
    },

    {
        name: "Dr. Amit Verma",
        department: "Orthopedics"
    },

    {
        name: "Dr. Neha Kapoor",
        department: "Gynecology"
    }

];


function updateDoctors() {

    const department =
        document.getElementById("appointmentDepartment").value;

    const doctorSelect =
        document.getElementById("appointmentDoctor");

    if (!doctorSelect) return;


    doctorSelect.innerHTML =
        `<option value="">Select Doctor</option>`;


    let filteredDoctors = doctors;

    if (department) {

        filteredDoctors =
            doctors.filter(
                doctor => doctor.department === department
            );

    }


    filteredDoctors.forEach(doctor => {

        const option =
            document.createElement("option");

        option.value = doctor.name;
        option.textContent = doctor.name;

        doctorSelect.appendChild(option);

    });

}


/* =====================================================
   APPOINTMENT → WHATSAPP
===================================================== */

function sendAppointmentToWhatsApp(event) {

    if (event) {
        event.preventDefault();
    }


    const name =
        document.getElementById("patientName").value.trim();

    const phone =
        document.getElementById("patientPhone").value.trim();

    const email =
        document.getElementById("patientEmail").value.trim();

    const department =
        document.getElementById("appointmentDepartment").value;

    const doctor =
        document.getElementById("appointmentDoctor").value;

    const date =
        document.getElementById("appointmentDate").value;

    const time =
        document.getElementById("appointmentTime").value;

    const message =
        document.getElementById("appointmentMessage").value.trim();


    /* Validation */

    if (!name ||
        !phone ||
        !department ||
        !doctor ||
        !date ||
        !time) {

        showToast("Please fill all required fields.");

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showToast("Please enter a valid 10 digit mobile number.");

        return;

    }


    /* Format date */

    let formattedDate = date;

    if (date) {

        const dateObject =
            new Date(date + "T00:00:00");

        formattedDate =
            dateObject.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });

    }


    /* WhatsApp message */

    const whatsappMessage = `

🏥 *MEDICARE HOSPITAL*
━━━━━━━━━━━━━━━━━━

📋 *NEW APPOINTMENT REQUEST*

👤 *Patient Name:*
${name}

📱 *Patient Phone:*
${phone}

📧 *Email:*
${email || "Not Provided"}

🏥 *Department:*
${department}

👨‍⚕️ *Doctor:*
${doctor}

📅 *Appointment Date:*
${formattedDate}

⏰ *Appointment Time:*
${time}

📝 *Patient Message:*
${message || "No additional message"}

━━━━━━━━━━━━━━━━━━
📍 MediCare Hospital
New Delhi, India

Please contact the patient and confirm the appointment.
━━━━━━━━━━━━━━━━━━

`;


    const encodedMessage =
        encodeURIComponent(whatsappMessage);


    const whatsappURL =
        `https://wa.me/${hospitalWhatsApp}?text=${encodedMessage}`;


    /*
       WhatsApp open होगा.
       User WhatsApp में जाकर Send दबाएगा.
    */

    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );


    showToast(
        "Appointment details opened in WhatsApp."
    );


    /* Optional form reset */

    document.getElementById("appointmentForm").reset();

}


/* =====================================================
   CONTACT FORM → WHATSAPP
===================================================== */

function sendMessageToWhatsApp(event) {

    if (event) {
        event.preventDefault();
    }


    const name =
        document.getElementById("contactName").value.trim();

    const phone =
        document.getElementById("contactPhone").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const subject =
        document.getElementById("contactSubject").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    /* Validation */

    if (!name || !phone || !message) {

        showToast("Please fill all required fields.");

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showToast("Please enter a valid 10 digit mobile number.");

        return;

    }


    const whatsappMessage = `

🏥 *MEDICARE HOSPITAL*
━━━━━━━━━━━━━━━━━━

📩 *NEW WEBSITE MESSAGE*

👤 *Name:*
${name}

📱 *Phone:*
${phone}

📧 *Email:*
${email || "Not Provided"}

📌 *Subject:*
${subject || "General Enquiry"}

💬 *Message:*
${message}

━━━━━━━━━━━━━━━━━━

Message received from MediCare Hospital Website.

━━━━━━━━━━━━━━━━━━

`;


    const encodedMessage =
        encodeURIComponent(whatsappMessage);


    const whatsappURL =
        `https://wa.me/${hospitalWhatsApp}?text=${encodedMessage}`;


    window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
    );


    showToast(
        "Your message opened in WhatsApp."
    );


    document.getElementById("contactForm").reset();

}


/* =====================================================
   GENERAL WHATSAPP
===================================================== */

function openWhatsAppGeneral() {

    const message = `

🏥 *MEDICARE HOSPITAL*

Hello MediCare Hospital,
I would like to enquire about your healthcare services.

Please provide more information.

Thank you.

`;


    const url =
        `https://wa.me/${hospitalWhatsApp}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   AMBULANCE WHATSAPP
===================================================== */

function openAmbulanceWhatsApp() {

    const message = `

🚑 *MEDICARE HOSPITAL - AMBULANCE REQUEST*

Hello,
I need an ambulance.

Please contact me as soon as possible.

📍 Location:
[Please enter your location]

📱 Contact Number:
[Please enter your number]

🚨 Emergency Details:
[Please describe]

`;

    const url =
        `https://wa.me/${hospitalWhatsApp}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   LAB TEST WHATSAPP
===================================================== */

function openLabModal() {

    openModal("labModal");

}


function sendLabTest(event) {

    event.preventDefault();


    const name =
        document.getElementById("labName").value.trim();

    const phone =
        document.getElementById("labPhone").value.trim();

    const test =
        document.getElementById("labTest").value;


    if (!name || !phone || !test) {

        showToast("Please fill all required fields.");

        return;

    }


    if (!/^[0-9]{10}$/.test(phone)) {

        showToast("Please enter a valid mobile number.");

        return;

    }


    const message = `

🏥 *MEDICARE HOSPITAL*

🧪 *LAB TEST BOOKING*

👤 Patient Name:
${name}

📱 Phone:
${phone}

🔬 Test:
${test}

Please contact me regarding the lab test booking.

`;


    const url =
        `https://wa.me/${hospitalWhatsApp}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );


    closeModal("labModal");

    showToast("Lab booking opened in WhatsApp.");

}


/* =====================================================
   DOCTOR FILTER
===================================================== */

function filterDoctors() {

    const search =
        document.getElementById("doctorSearch")
        .value
        .toLowerCase()
        .trim();

    const department =
        document.getElementById("doctorDepartment")
        .value;


    const cards =
        document.querySelectorAll(".doctor-card");


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const cardDepartment =
            card.dataset.department;


        const matchName =
            name.includes(search);

        const matchDepartment =
            department === "all" ||
            cardDepartment === department;


        card.style.display =
            matchName && matchDepartment
                ? ""
                : "none";

    });

}


/* =====================================================
   DEPARTMENT FILTER
===================================================== */

function filterDepartments() {

    const search =
        document.getElementById("departmentSearch")
        .value
        .toLowerCase()
        .trim();


    const cards =
        document.querySelectorAll(".department-card");


    cards.forEach(card => {

        const name =
            card.dataset.name;

        card.style.display =
            name.includes(search)
                ? ""
                : "none";

    });

}


/* =====================================================
   DOCTOR PROFILE
===================================================== */

function openDoctor(
    name,
    speciality,
    department,
    experience
) {

    document.getElementById("doctorModalName")
        .textContent = name;

    document.getElementById("doctorModalSpeciality")
        .textContent = speciality;

    document.getElementById("doctorModalDepartment")
        .textContent = department;

    document.getElementById("doctorModalExperience")
        .textContent = experience;


    openModal("doctorModal");

}


/* =====================================================
   DEPARTMENT
===================================================== */

function openDepartment(department) {

    showToast(
        department +
        " department selected."
    );


    setTimeout(() => {

        openAppointmentModal();

        document.getElementById(
            "appointmentDepartment"
        ).value = department;

        updateDoctors();

    }, 500);

}


/* =====================================================
   ROOM ENQUIRY
===================================================== */

function bookRoom(room, price) {

    const message = `

🏥 *MEDICARE HOSPITAL*

🛏️ *ROOM ENQUIRY*

Room Type:
${room}

Price:
${price}

I would like to enquire about room availability.

Please contact me.

`;


    const url =
        `https://wa.me/${hospitalWhatsApp}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   HEALTH PACKAGE
===================================================== */

function bookPackage(packageName, price) {

    const message = `

🏥 *MEDICARE HOSPITAL*

🎁 *HEALTH PACKAGE ENQUIRY*

Package:
${packageName}

Price:
${price}

I would like to book/enquire about this health package.

Please contact me.

`;


    const url =
        `https://wa.me/${hospitalWhatsApp}?text=${encodeURIComponent(message)}`;


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =====================================================
   FAQ
===================================================== */

function toggleFAQ(button) {

    const item =
        button.parentElement;


    document.querySelectorAll(".faq-item")
        .forEach(faq => {

            if (faq !== item) {
                faq.classList.remove("open");
            }

        });


    item.classList.toggle("open");

}


/* =====================================================
   GALLERY
===================================================== */

function openGallery(element) {

    const image =
        element.querySelector("img");

    const modal =
        document.getElementById("galleryModal");

    const modalImage =
        document.getElementById("galleryModalImage");


    modalImage.src = image.src;

    modal.classList.add("show");

    document.body.style.overflow = "hidden";

}


function closeGallery() {

    document.getElementById(
        "galleryModal"
    ).classList.remove("show");

    document.body.style.overflow = "";

}


/* =====================================================
   TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");


    toastMessage.textContent = message;

    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer =
        setTimeout(() => {

            toast.classList.remove("show");

        }, 3500);

}


/* =====================================================
   BACK TO TOP
===================================================== */

const backTop =
    document.getElementById("backTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backTop.classList.add("show");

    } else {

        backTop.classList.remove("show");

    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute("id");

        }

    });


    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + current
        ) {

            link.classList.add("active");

        }

    });

});


/* =====================================================
   COUNTER ANIMATION
===================================================== */

const counters =
    document.querySelectorAll("[data-count]");


let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    const stats =
        document.querySelector(".stats-section");

    if (!stats) return;


    const rect =
        stats.getBoundingClientRect();


    if (rect.top < window.innerHeight - 100) {

        counterStarted = true;


        counters.forEach(counter => {

            const target =
                Number(counter.dataset.count);

            let current = 0;

            const increment =
                Math.max(
                    1,
                    Math.ceil(target / 80)
                );


            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    counter.textContent =
                        target.toLocaleString() + "+";

                    return;

                }


                counter.textContent =
                    current.toLocaleString();


                requestAnimationFrame(
                    updateCounter
                );

            };


            updateCounter();

        });

    }

}


window.addEventListener(
    "scroll",
    startCounters
);

startCounters();


/* =====================================================
   ESC KEY
===================================================== */

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        document.querySelectorAll(".modal")
            .forEach(modal => {

                modal.classList.remove("show");

            });


        closeGallery();

        document.body.style.overflow = "";

    }

});


/* =====================================================
   PREVENT NON-NUMERIC PHONE CHARACTERS
===================================================== */

document.querySelectorAll(
    'input[type="tel"]'
).forEach(input => {

    input.addEventListener(
        "input",
        function () {

            this.value =
                this.value.replace(/\D/g, "")
                           .slice(0, 10);

        }
    );

});


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "MediCare Hospital Website Loaded Successfully."
);




















/* =========================================
   MEDICARE HOSPITAL
   POPUP + WHATSAPP
========================================= */

const WHATSAPP_NUMBER = "919315330320";


/* =========================================
   OFFER POPUP
========================================= */

const offerPopup = document.getElementById("offerPopup");
const closeOfferPopup = document.getElementById("closeOfferPopup");


/* OPEN POPUP */

function showOfferPopup() {

    if (!offerPopup) return;

    offerPopup.classList.add("show");

    document.body.style.overflow = "hidden";
}


/* CLOSE POPUP */

function hideOfferPopup() {

    if (!offerPopup) return;

    offerPopup.classList.remove("show");

    document.body.style.overflow = "";
}


/* CLOSE BUTTON */

if (closeOfferPopup) {

    closeOfferPopup.addEventListener(
        "click",
        hideOfferPopup
    );
}


/* OVERLAY CLICK */

if (offerPopup) {

    offerPopup.addEventListener(
        "click",
        function(event) {

            if (event.target === offerPopup) {

                hideOfferPopup();

            }

        }
    );
}


/* ESC KEY */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            hideOfferPopup();

        }

    }
);


/* SHOW POPUP AFTER 2 SECONDS */

window.addEventListener(
    "load",
    function() {

        setTimeout(
            function() {

                // Session me ek baar popup show hoga
                if (
                    sessionStorage.getItem(
                        "medicarePopupShown"
                    ) !== "yes"
                ) {

                    showOfferPopup();

                    sessionStorage.setItem(
                        "medicarePopupShown",
                        "yes"
                    );
                }

            },
            4000
        );

    }
);


/* =========================================
   POPUP BOOK APPOINTMENT
========================================= */

function openAppointmentFromPopup() {

    hideOfferPopup();

    // Aapke appointment modal ka ID
    const appointmentModal =
        document.getElementById("appointmentModal");

    if (appointmentModal) {

        appointmentModal.classList.add("show");

        document.body.style.overflow = "hidden";

    } else {

        // Agar modal nahi mila to appointment section
        const appointmentSection =
            document.getElementById("appointment");

        if (appointmentSection) {

            appointmentSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    }
}


/* =========================================
   POPUP WHATSAPP
========================================= */

function popupWhatsApp() {

    const message =
        "Hello MediCare Hospital,%0A%0A" +
        "I am interested in the 20% OFF health checkup offer.%0A" +
        "Please share the available packages and details.";

    const whatsappURL =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        message;

    window.open(
        whatsappURL,
        "_blank"
    );
}




























/* =========================================
   DARK MODE - FINAL WORKING VERSION
========================================= */

const themeToggle = document.getElementById("themeToggle");


function applyTheme(theme) {

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

            themeToggle.title =
                "Switch to Light Mode";
        }

    } else {

        document.body.classList.remove("dark-mode");

        if (themeToggle) {

            themeToggle.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

            themeToggle.title =
                "Switch to Dark Mode";
        }
    }

    localStorage.setItem(
        "hospitalTheme",
        theme
    );
}


/* LOAD SAVED THEME */

const savedTheme =
    localStorage.getItem("hospitalTheme");

if (savedTheme === "dark") {

    applyTheme("dark");

} else {

    applyTheme("light");
}


/* TOGGLE */

if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                applyTheme("light");

            } else {

                applyTheme("dark");

            }

        }
    );
}