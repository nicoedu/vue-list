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
        } else {
            parsedData.push(data)
            localStorage.setItem(name, JSON.stringify(parsedData));
        }
    }

    put(name:string, data: any){
        const parsedData = this.get(name);
        if(!parsedData){
            return false;
        }
        const item = parsedData.findIndex((el: any) => el.id === data.id)
        if(item < 0){
            return false;
        }
        parsedData[item] = data;
        localStorage.setItem(name, JSON.stringify(parsedData));
    }

    delete(name:string, id?: number){

    }

}

export default Api;