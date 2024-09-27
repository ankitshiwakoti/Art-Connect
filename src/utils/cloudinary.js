import { Cloudinary } from "@cloudinary/url-gen";
import { auto, scale, crop } from '@cloudinary/url-gen/actions/resize';
import { autoGravity, focusOn } from '@cloudinary/url-gen/qualifiers/gravity';

export const cld = new Cloudinary({ cloud: { cloudName: 'dqaidz667' } });

export const getCldImg = (imageId, width, height) => {
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