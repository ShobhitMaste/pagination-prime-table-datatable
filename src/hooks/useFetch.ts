import { useState, useEffect } from "react";

type FetchState<T> = {
    data : T | null;
    loading: boolean;
    error: string | null;
};


export default function useFetch<T>(url : string): FetchState<T> {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true; 

        const fetchData = async (): Promise<void> => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url);
                if(!response.ok) {
                    throw new Error(`Error ${response.status} : ${response.statusText} `);
                }

                const jsons = await response.json();
                const json = jsons.data;
                const actualData = [];
                json.forEach(element => {
                    const requiredData = (({title, place_of_origin, artist_display, inscriptions, date_start, date_end}) => ({title, place_of_origin, artist_display, inscriptions, date_start, date_end}))(element);
                    actualData.push(requiredData);
                });
                if(isMounted){
                    setData(actualData)
                }
            } catch (err: any) {
                if(isMounted) {
                    setError(err.message || "Error occured!");
                }
            } finally { 
                if(isMounted){
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url] )

    return {data, loading, error};
}