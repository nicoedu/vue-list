import type { Contact } from "@/models/contact";
import Api from "./mockApi";

class ContactService {
    api: Api;

    constructor(){
        this.api = Api.getInstance();
    }

    getAll(): Contact[] {
      return this.api.get('contact');
    }
    get(id: number): Contact {
      return this.api.get('contact',id);
    }
    create(contact: Contact) {
      return this.api.post('contact',contact);
    }
    update(contact: Contact) {
      return this.api.put('contact',contact);
    }
    delete(id: number) {
      return this.api.delete('contact',id);
    }
  }
  export default new ContactService();