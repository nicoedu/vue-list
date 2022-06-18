import type { Contact } from "@/models/contact";

class Api {

    static instance: Api | undefined;

    static getInstance(){
        if(!this.instance){
            this.instance = new Api();
        }
        return this.instance;
    }

    get(name: string, id?: number): any{
        const data = localStorage.getItem(name)
        if(data){
            const parsedData = JSON.parse(data)
            if(id){
                return parsedData.find((el: any) => el.id === id)
            }
            return parsedData;
        } else {
            return null;
        }
    }

    post(name:string, data: any){
        const parsedData = this.get(name);
        if(!parsedData){
            localStorage.setItem(name, JSON.stringify([data]));
            return {success:true, data: null}
        } else {
            if(!this.verifyEmailandContact(parsedData, data)){
                return {success: false, data: "Email or Contact info already in use"}
            }
            data.id = Date.now();
            parsedData.push(data)
            
            localStorage.setItem(name, JSON.stringify(parsedData));
            return {success: true, data: null}
        }
    }

    put(name:string, data: any){
        const parsedData = this.get(name);
        if(!parsedData){
            return {success: false, data: "No contacts registred"};
        }
        const item = parsedData.findIndex((el: any) => el.id === data.id)
        if(item < 0){
            return {success: false, data: "Contact not found"};
        }
        if(!this.verifyEmailandContact(parsedData, data)){
            return {success: false, data: "Email or Contact info already in use"}
        }
        parsedData[item] = data;
        localStorage.setItem(name, JSON.stringify(parsedData));
        return {success: true, data: null}
    }

    delete(name:string, id?: number){
        const parsedData = this.get(name);
        const item = parsedData.findIndex((el: any) => el.id === id)
        if(item < 0){
            return {success: false, data: "Contact not found"};
        }
        parsedData.splice(item, 1);
        localStorage.setItem(name, JSON.stringify(parsedData));
        return {success: true, data: null}
    }

    private verifyEmailandContact(currentContacts: Contact[], newContact: Contact) {
        const index = currentContacts.findIndex((el: any) => {
            return el.email === newContact.email || el.contact === newContact.contact
        })
        return index > -1 ? false : true;
    }

}

export default Api;