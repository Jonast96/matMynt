const key = "NBT65Ohkkh5oIVNrbAfFuEO6ftZzZhzHWDdsRXNb";

async function fetchProductData(url) {
  try {
    const response = await fetch(`https://kassal.app/api/v1/${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });

    const data = await response.json();
    console.log(data);

    if (data?.data?.products) {
      const sortedStores = data?.data?.products?.sort((a, b) => {
        return a?.current_price?.price - b?.current_price?.price;
      });

      return {
        product: data?.data?.products?.[0] || "",
        stores: sortedStores || [],
      };
    }

    throw new Error("Invalid response");
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default fetchProductData;
