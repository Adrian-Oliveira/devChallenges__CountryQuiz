
const baseUrl = 'https://restcountries.com/v3.1/all';
/* Documentation: https://pprathameshmore.github.io/QuoteGarden/ */

export default {
    getCountriesData:async ()=>{
        try{
            let options = {
                method: 'GET',
            };

            let response = await fetch(`${baseUrl}`, options);
            
            if (!response.ok) {
                throw new Error('Failed to get quote');
            }
            
            const text = await response.text();
            const objResponse = JSON.parse(text);

            return objResponse;
        }
        catch(error){
            console.error('Error:', error);
        }
    },
}