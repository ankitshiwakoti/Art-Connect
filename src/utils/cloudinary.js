import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';

export const cld = new Cloudinary({ cloud: { cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME } });

export const getCldImg = (imageId, width = 720, height) => {
    const img = cld.image(imageId).format('auto').quality('auto');
    if (width && height) {
        img.resize(auto().width(width).height(height));
    } else if (width) {
        img.resize(auto().width(width));
    } else if (height) {
        img.resize(auto().height(height));
    } else {
        img.resize(auto().gravity(autoGravity()))
    }

    return img;
}

const loadImage = (src) => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
        //document.body.appendChild(img);
        //img.style.display = 'none';
    });
};

export const preloadImages = async (cldImgs) => {
    return await Promise.all(
        cldImgs.map((cldImg) => {
            return loadImage(cldImg.toURL());
        })
    );
};


