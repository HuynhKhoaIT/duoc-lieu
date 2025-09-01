import { useCallback,useEffect, useState } from "react";

import fetcher from "@/services/fetcher";

function useListData(apiConfig, options = {}) {
    const {
        immediate = true,
        defaultParams = {},
        defaultPathParams = {},
    } = options;

    const [ data, setData ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchData = useCallback(
        async (params = {}, pathParams = {}) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetcher(apiConfig, {
                    params: { ...defaultParams, ...params },
                    pathParams: { ...defaultPathParams, ...pathParams },
                });

                if (response?.status === 200 || response?.status === 201) {
                    setData(response.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [ apiConfig, defaultParams, defaultPathParams ],
    );

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [  immediate ]);

    return { data, loading, error, refetch: fetchData };
}

export default useListData;
