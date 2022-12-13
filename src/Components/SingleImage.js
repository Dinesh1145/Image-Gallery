import "./style.css"

const SingleProduct = ({ image }) => {
    return (
        <div className="image">
            <img src={image?.urls?.small} alt={image?.description ?? "image"} />
        </div >
    );
};

export default SingleProduct;
