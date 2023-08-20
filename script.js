// Listen to form submit
document.getElementById('contactForm').addEventListener('submit', contactForm);

// save contact
function contactForm(e) {
    // get values from form
    var personName = document.getElementById('personName').value;
    var surname = document.getElementById('surname').value;
    var personMobile = document.getElementById('personMobile').value;
    
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
        phonebook.push(contacts);
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
     // first get contacts from local storage
     var phonebook = JSON.parse(localStorage.getItem('phonebook'));

     // get the output ID
     var phonebookResult = document.getElementById('phonebookResult');

     phonebookResult.innerHTML = '';

     for (var i = 0; i < phonebook.length; i++) {
        var name = phonebook[i].name;
        var surname = phonebook[i].surname;
        var mobile = phonebook[i].mobile;

        phonebookResult.innerHTML += '<tr>'+
                                        '<td class="contact-name">'+name+'</td>'+
                                        '<td class="contact-surname">'+surname+'</td>'
                                        '<td class="contact-number">'+mobile+'</td>'
                                        '<td><a href="#" class="btn btn-danger" onclick="deleteContact('+mobile+')">Delete</a></td>'+
                                        '</tr>';                    
     }
}

// JavaScript for search bar
function search_contact() {
	let input = document.getElementById('searchbar').value
	input=input.toLowerCase();
	let x = document.getElementsByClassName('contact-name');
	
	for (i = 0; i < x.length; i++) {
		if (!x[i].innerHTML.toLowerCase().includes(input)) {
			x[i].style.display="none";
		}
		else {
			x[i].style.display="list-item";				
		}
	}
}

function deleteContact(num) {
    var phonebook = JSON.parse(localStorage.getItem('phonebook'));
    for (var i = 0; i < phonebook.length; i++) {
        if ((phonebook[i].mobile == num)) {
            phonebook.splice(i, 1);
        }
    }
    // reset back to localStorage
    localStorage.setItem("phonebook",JSON.stringify(phonebook));

    fetchPhonebook();
}

//get the search bar to work