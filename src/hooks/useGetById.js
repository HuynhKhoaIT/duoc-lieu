import { useCallback,useEffect, useState } from "react";

import fetcher from "@/services/fetcher";


function useGetById(apiConfig, options = {}) {
    const { id, pathParams = {}, params = {}, immediate = true } = options;

    const [ data, setData ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const fetchData = useCallback(
        async (customId, customPathParams = {}, customParams = {}) => {
            setLoading(true);
            setError(null);

            try {
                const mergedPathParams = {
                    ...pathParams,
                    ...(customPathParams || {}),
                };

                if (customId || id) {
                    mergedPathParams.id = customId || id;
                }

                const response = await fetcher(apiConfig, {
                    params: { ...params, ...customParams },
                    pathParams: mergedPathParams,
                });

                if (response?.status === 200 || response?.status === 201) {
                    setData(response.data.data);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [ apiConfig, id, pathParams, params ],
    );

    useEffect(() => {
        if (immediate && (id || Object.keys(pathParams).length > 0)) {
            fetchData();
        }
    }, [ immediate, id ]);

    return { data, loading, error, refetch: fetchData };
}

export default useGetById;
