import { Component, OnInit } from '@angular/core';
import { Contacts, PhoneType, EmailType, ContactPayload } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  contacts!: ContactPayload[];

  constructor() { }

  ngOnInit() {
  }

  createNewContact = async () => {
    const res = await Contacts.createContact({
      contact: {
        name: {
          given: 'John',
          family: 'Doe',
        },
        birthday: {
          year: 1990,
          month: 1,
          day: 1,
        },
        phones: [
          {
            type: PhoneType.Mobile,
            label: 'mobile',
            number: '+1-212-456-7890',
          },
          {
            type: PhoneType.Work,
            label: 'work',
            number: '212-456-7890',
          },
        ],
        emails: [
          {
            type: EmailType.Work,
            label: 'work',
            address: 'example@example.com',
          },
        ],
        urls: ['example.com'],
      },
    });

    console.log(res.contactId);
  };

  async listContacts() {
    const projection = {
      // Specify which fields should be retrieved.
      name: true,
      phones: true,
      postalAddresses: true,
    };

    const result = await Contacts.getContacts({
      projection,
    });

    this.contacts = result.contacts;
    
  }

}
