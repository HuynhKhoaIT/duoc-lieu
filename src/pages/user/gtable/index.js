import { Fragment } from "react";

import Breadcrumb from "@/components/Common/Breadcrumb/Breadcrumb";
import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import Layout from "@/components/layouts/Layout";
import GtablePage from "@/components/Pages/User/Gtable";
function Gtable() {
    // const {
    //     data: products,
    //     loading: loadingProducts,
    //     error: errorProducts,
    //     refetch: refetchProducts,
    // } = useListData(apiConfig.products.getList);

    return (
        <Fragment>
            <Breadcrumb title={"Bảng tri ân"} />
            <GtablePage />
            <LogoCarousel />
        </Fragment>
    );
}


Gtable.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Gtable;
