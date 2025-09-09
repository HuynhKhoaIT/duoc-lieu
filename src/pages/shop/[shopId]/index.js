import LogoCarousel from "@/components/Common/Carousel/LogoCarousel/LogoCarousel";
import RenderContext from "@/components/context/RenderContext";
import Layout from "@/components/layouts/Layout";
import ShopDetailPage from "@/components/Pages/ShopDetail/ShopDetailPage";
import apiConfig from "@/constants/apiConfig";
import { useGlobalContext } from "@/contexts/GlobalContext";

function ShopDetail({ products, productsList, error, errorList, slideList }) {
    const metadata = {
        title: products?.name || "Sản phẩm",
        description:
            products?.description || products?.excerpt || "Chi tiết sản phẩm",
        image: products?.thumbnail || "/images/logo.png",
    };
    const { data } = useGlobalContext();

    return (
        <RenderContext metadata={metadata}>
            <ShopDetailPage
                dataDetail={products}
                productsList={productsList}
                error={error}
                errorList={errorList}
                cartData={data}
            />
            <LogoCarousel slideList={slideList} />
        </RenderContext>
    );
}

export async function getStaticProps({ params }) {
    try {
        const [ res, resList, resSlide ] = await Promise.all([
            fetch(
                apiConfig.products.getDetail.url.replace(":id", params.shopId),
                {
                    cache: "force-cache",
                },
            ),
            fetch(apiConfig.products.getList.url, {
                cache: "force-cache",
            }),
            fetch(apiConfig.slide.getList.url, {
                cache: "force-cache",
            }),
        ]);

        const products = res.ok ? await res.json() : null;
        const productsList = resList.ok ? await resList.json() : [];
        const slideList = resSlide.ok ? await resSlide.json() : [];

        return {
            props: {
                products: products?.data || null,
                productsList,
                error: res.ok ? null : `Error ${res.status}`,
                errorList: resList.ok ? null : `Error ${resList.status}`,
                slideList,
                errorSlide: resSlide.ok ? null : `Error ${resSlide.status}`,
            },
            revalidate: 300, // sau 300s sẽ build lại
        };
    } catch (err) {
        return {
            props: {
                products: null,
                productsList: [],
                error: err.message,
                errorList: err.message,
                slideList: [],
                errorSlide: err.message,
            },
            revalidate: 60, // fallback nhanh hơn nếu lỗi
        };
    }
}

export async function getStaticPaths() {
    return { paths: [], fallback: "blocking" };
}

ShopDetail.getLayout = function getLayout(page) {
    return <Layout>{page}</Layout>;
};

export default ShopDetail;
