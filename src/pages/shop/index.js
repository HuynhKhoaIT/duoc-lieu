import Layout from "@/components/layouts/Layout";
import ShopPage from "@/components/Pages/Shop/ShopPage";

function Shop() {

    return (
        <ShopPage/>
    );
}

Shop.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default Shop;
