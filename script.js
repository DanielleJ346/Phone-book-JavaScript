// Listen to form submit
document.getElementById('contactForm').addEventListener('submit', contactForm);

// validating phone numbers
var personMobileInput = document.getElementById('personMobile');
personMobileInput.addEventListener('input', validatePhoneNumber);

// save contact
function contactForm(e) {
    // get values from form
    var personName = document.getElementById('personName').value;
    var surname = document.getElementById('surname').value;
    var personMobile = document.getElementById('personMobile').value;
    
     // Validate the phone number format
     var phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;
     if (!phoneNumberPattern.test(personMobile)) {
         alert("Invalid phone number format. Please use the format: 081-365-9535");
         return false; // Prevent form submission
     }

    if(!personName || !personMobile) {
        alert("Please fill in all fields");
        return false;
    }

    var contact = {
        name: personName,
        surname: surname,
        mobile: personMobile
    }

    //localStorage.setItem('test', "Hello World!");
    //console.log(localStorage.getItem('test'))

    // Test if phonebook is null
    if (localStorage.getItem('phonebook') === null) {
        //init Array
        var phonebook = [];
        // add data to array
        phonebook.push(contact);

        // set to local storage
        localStorage.setItem('phonebook', JSON.stringify(phonebook));
    } else {
        // first get contacts from local storage
        var phonebook = JSON.parse(localStorage.getItem('phonebook'));
        //add new contact to array
        phonebook.push(contact);
        //rest back to local storage
        localStorage.setItem('phonebook', JSON.stringify(phonebook));
    }

    //clear form
    document.getElementById('contactForm').reset();

        //fetch all contacts
        fetchPhonebook();
    e.preventDefault();
}

// fetch the contacts from localStorage
function fetchPhonebook() {
    // Get contacts from local storage
    var phonebook = JSON.parse(localStorage.getItem('phonebook'));

    // Sort the phonebook array alphabetically based on the name
    phonebook.sort(function(a, b) {
        var nameA = a.name.toLowerCase();
        var nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });

    // Get the output ID
    var phonebookResult = document.getElementById('phonebookResult');

    phonebookResult.innerHTML = '';

    for (var i = 0; i < phonebook.length; i++) {
        var name = phonebook[i].name;
        var surname = phonebook[i].surname;
        var mobile = phonebook[i].mobile;

        phonebookResult.innerHTML += '<tr class="contact-row">'+
                                    '<td class="contact-name">'+name+'</td>'+
                                    '<td class="contact-surname">'+surname+'</td>' +
                                    '<td class="contact-number">'+mobile+'</td>' +
                                    '<td><a href="#" class="btn btn-danger" onclick="deleteContact(\''+mobile+'\')">Delete</a></td>'+
                                    '</tr>';
    }
}


// search bar
function search_contact() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let rows = document.getElementsByClassName('contact-row');

    for (let i = 0; i < rows.length; i++) {
        let name = rows[i].querySelector('.contact-name').textContent.toLowerCase();
        let surname = rows[i].querySelector('.contact-surname').textContent.toLowerCase();
        let mobile = rows[i].querySelector('.contact-number').textContent.toLowerCase();

        if (name.includes(input) || surname.includes(input)) {
            rows[i].classList.remove('hidden'); // Show rows that match the search
        } else {
            rows[i].classList.add('hidden');    // Hide rows that don't match
        }
    }
}



//delete contacts
function deleteContact(num) {
    var phonebook = JSON.parse(localStorage.getItem('phonebook'));
    
    var indexToDelete = -1;

    for (var i = 0; i < phonebook.length; i++) {
        if (phonebook[i].mobile == num) {
            indexToDelete = i;
            break; // No need to continue searching
        }
    }

    if (indexToDelete !== -1) {
        phonebook.splice(indexToDelete, 1);

        // reset back to localStorage
        localStorage.setItem("phonebook", JSON.stringify(phonebook));

        fetchPhonebook();
    }
}

// validating phone numbers
function validatePhoneNumber() {
    var phoneNumber = this.value; // Get the entered phone number
    var phoneNumberPattern = /^\d{3}-\d{3}-\d{4}$/;

    // Test if the entered phone number matches the pattern
    if (phoneNumberPattern.test(phoneNumber)) {
        this.classList.remove('invalid');
        this.classList.add('valid');
    } else {
        this.classList.remove('valid');
        this.classList.add('invalid');
    }
}

