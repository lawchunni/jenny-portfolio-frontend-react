
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import { createPortfolioApi, updatePortfolioApi } from "../../services/portfolioApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useTokenValidation } from "../../hooks/useTokenValidation";
import { useLogout } from "../../hooks/useLogout";

const TYPE_CREATE = 'create';
const TYPE_UPDATE = 'update';

const PortfolioForm = ({ type, data = null }) => {

  // ======== validate input data ==========
  const VALID_IMG_FORMAT = ['image/jpeg', 'image/png', 'image/gif'];
  const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1mb

  const schema = yup.object().shape({
    title: yup.string().required('Title is required').max(50, 'Title must be under 50 charactors.'),
    thumbnail: yup.mixed()
              .test('fileFormat', 'Not a valid image format', 
                value => !value || !value.length || VALID_IMG_FORMAT.includes(value[0].type))
              .test('fileSize', 'Max allowed size is 1 MB', 
                value => !value || !value.length || value[0].size <= MAX_FILE_SIZE),
    images: yup.mixed()
              .test('fileFormat', 'Not a valid image format',
                value => !value || !value.length || Array.from(value).every(file => file.size <= MAX_FILE_SIZE))
              .test('fileSize', 'Max allowed size is 1 MB', 
                value => !value || !value.length || Array.from(value).every(file => VALID_IMG_FORMAT.includes(file.type))),
    desc_short: yup.string().required('Short Desc is required').max(200, 'Short Desc must be under 200 charactors.'),
    desc_long: yup.string().required('Long Desc is required').max(3000, 'Long Desc must be under 3000 charactors.'),
    tags: yup.string().required('Tags is required'),
    slug: yup.string().required('Slug is required').max(50, 'Slug must be under 50 charactors.')
  });

  // apply form validation and handle submit
  const { register, handleSubmit, formState: { errors }, setValue, resetField } = useForm({
    resolver: yupResolver(schema)
  });

  // new thumbnail state
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const navigate = useNavigate();

  const { getRefreshToken } = useAuth();
  const { validateAndFetchData } = useTokenValidation();
  const  logoutFromServer = useLogout();

  // Thumbnail upload and preview
  const handleThumbnailChange = (e) => {
    e.preventDefault();
    
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setThumbnail(file);
    setThumbnailPreview(preview);

    // Manually set the files in react-hook-form
    setValue('thumbnail', file);
  }

  // remove image in thumbnail upload field 
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    
    resetField('thumbnail'); // remove field
  }

  // Multi images upload and preview
  const handleImagesChange = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);

    if (!files) return;

    const preview = files.map(file => URL.createObjectURL(file));
    
    setSelectedImages(files);
    setImagePreview(preview);

    // Manually set the files in react-hook-form
    setValue('images', files);
  }

  // remove selected image in multi images upload field 
  const removeImages = (index) => {
    const newSelectedFiles = selectedImages.filter((_, i) => i !== index);
    const newImagesPreviews = imagePreview.filter((_, i) => i !== index);
   
    setSelectedImages(newSelectedFiles);
    setImagePreview(newImagesPreviews);
    if(newSelectedFiles.length > 0) {
      setValue('images', newSelectedFiles);// Update form data in react-hook-form
    } else {
      resetField('images'); // remove field
    }
  }

  // Submit form to the server
  const onSubmit = async (newData) => {
    const formData = new FormData();

    // ------ Sanitize & fotmat data ------- //
    const id = DOMPurify.sanitize(newData._id);
    const santizedTags = DOMPurify.sanitize(newData.tags);
    const santizedHighlight = DOMPurify.sanitize(newData.highlight); // convert string to boolean on backend
    const santizedDeleted = DOMPurify.sanitize(newData.deleted); // convert string to boolean on backend

    // ---- add data to formdata ---- //
    formData.append('title', DOMPurify.sanitize(newData.title));
    formData.append('desc_short', DOMPurify.sanitize(newData.desc_short));
    formData.append('desc_long', DOMPurify.sanitize(newData.desc_long));
    formData.append('tags', santizedTags);
    formData.append('slug', DOMPurify.sanitize(newData.slug));
    formData.append('highlight', santizedHighlight);
    formData.append('deleted', santizedDeleted);

    if (thumbnail) {
      formData.append('thumbnail', thumbnail); // only append when a new image is being uploaded
    }

    if (selectedImages && selectedImages.length > 0) {
      selectedImages.forEach((img) => {
        formData.append('images', img); 
      })
    }

    if ( type === TYPE_CREATE ) {
      // create new for data via api
      try {
        const sendFormToServer = await validateAndFetchData({
          fetchDataFunc: createPortfolioApi, 
          type: 'CREATE',
          data: formData
        });

        if (sendFormToServer) {
          navigate("../admin/portfolio-list");
        } else {
          // only logout user when refresh token is missing
          if (!getRefreshToken()) {
            const handleLogout = async () => {
              await logoutFromServer();
            }
            handleLogout();
            return;
          }
        }
      } catch (err) {
        alert('Error: ' + err.message);
      }
    
    } else if( type === TYPE_UPDATE ) {
    // update existing form data via api
      try {
        const sendFormToServer = await validateAndFetchData({
          fetchDataFunc: updatePortfolioApi, 
          path: 'portfolio-edit', 
          id: id, 
          data: formData
        });
        
        if (sendFormToServer) {
          navigate("../admin/portfolio-list");
        } else {
           // only logout user when refresh token is missing
           if (!getRefreshToken()) {
            const handleLogout = async () => {
              await logoutFromServer();
            }
            handleLogout();
            return;
          }
        }

      } catch (err) {
        alert('Error: ' + err.message);
      }
    }

  }

  return (
    <div className="admin_form">   
      {/* ===========Form Started===========*/}
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
        {
          type === TYPE_UPDATE && <p>
            <span className="left">Id</span>
            <span className="right">{data?._id}</span>
            <input type="hidden" name="id" defaultValue={data?._id && data?._id} {...register('_id')} />
          </p>
        }
        
        <p>
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            defaultValue={data?.title && data?.title} 
            {...register('title')}
            />

          {errors.title && <span className="error">{errors.title?.message}</span>}
        </p>

        <p> 
          <label htmlFor="thumbnail">Thumbnail</label>
          <span className="upload_img">
            <input 
              type="file" 
              name="thumbnail" 
              id="thumbnail" 
              accept=".png,.jpg,.jpeg,image/png,gif" 
              onChange={handleThumbnailChange} />
          </span>

          {/* display in CREATE mode*/}
          {(type === TYPE_CREATE && errors.thumbnail_create) && <span className="error">{errors.thumbnail_create?.message}</span>}
        </p>

        {/* display in UPDATE mode*/}
        {
          type === TYPE_UPDATE && <div>
            <div className="left"></div>
            <div className="right">
              <img src={'http://127.0.0.1:4000' + data?.thumbnail}
                alt={data?.title} width={60}/>
            </div>
          </div>
        }
        
        {
          thumbnailPreview?.length > 0 && <div>
            <div className="left"></div>
            <div className="right">
              <p>New Thumbnail Previews</p>
                <div className="preview_img">
                  <img src={thumbnailPreview} alt="thumbnail preview" width={60}/>

                  <button className="btn delete_btn delete_img" onClick={() => removeThumbnail()}>Delete</button>
                </div>
            </div>
          </div>
        }

        <p> 
          <label htmlFor="images">All Images</label>
          <span className="upload_img">
            <input 
              type="file" 
              name="images" 
              id="images" 
              accept=".png,.jpg,.jpeg,image/png,gif"
              multiple
              onChange={handleImagesChange} />
          </span>

          {/* display in CREATE mode*/}
          {(type === TYPE_CREATE && errors.images_create) && <span className="error">{errors.images_create?.message}</span>}  

          {/* display in UPDATE mode*/}
          {(type === TYPE_UPDATE && errors.images_update) && <span className="error">{errors.images_update?.message}</span>}
        </p>

        {/* display in UPDATE mode*/}
        {
          (type === TYPE_UPDATE && data?.images) && <div>
            <div className="left"></div>
            <div className="right">
              {
                data?.images.map((item, index) => {
                  return (
                    <span className="preview_img" key={index}>
                      <img src={'http://127.0.0.1:4000' + item} alt={item} width={60}/>
                    </span>
                  )
                })
              }
            </div>
          </div>
        }
        
        {
          imagePreview?.length > 0 && <div>
            <div className="left"></div>
            <div className="right">
              <p>New Images Previews</p>
                {
                  imagePreview?.map((preview, index) => (
                    <div className="preview_img" key={index}>
                      <img src={preview} alt={`Preview ${index}`} width={60}/>
                      
                      <button className="btn delete_btn delete_img" onClick={() => removeImages(index)}>Delete</button>
                    </div>
                  ))
                }
            </div>
          </div>
        }
        
        <p>
          <label htmlFor="desc_short">Short Desc</label>
          <textarea 
            name="desc_short" 
            id="desc_short" 
            cols="10" 
            rows="5" 
            defaultValue={data?.desc_short && data?.desc_short}
            {...register('desc_short')} ></textarea>
          <span className="reminder">Limit: 200 words</span>
          {errors.desc_short && <span className="error">{errors.desc_short?.message}</span>}  
        </p>

        <p>
          <label htmlFor="desc_long">Long Desc</label>
          <textarea 
            name="desc_long" 
            id="desc_long" 
            cols="30" 
            rows="10" 
            defaultValue={data?.desc_long && data?.desc_long}
            {...register('desc_long')} ></textarea>
          <span className="reminder">Limit: 3000 words</span>
          {errors.desc_long && <span className="error">{errors.desc_long?.message}</span>}  
        </p>

        <p>
          <label htmlFor="tags">Technology tags</label>
          <input 
            type="text" 
            name="tags" 
            id="tags" 
            defaultValue={data?.tags && data?.tags}
            {...register('tags')} />
          <span className="reminder">Please use | as seperator. e.g. javascript|CSS|PHP</span>
          {errors.tags && <span className="error">{errors.tags?.message}</span>}
        </p>

        <p>
          <label htmlFor="slug">Slug</label>
          <input 
            type="text" 
            name="slug" 
            id="slug" 
            defaultValue={data?.slug && data?.slug}
            {...register('slug')} />
          {errors.slug && <span className="error">{errors.slug?.message}</span>}
        </p>

        <p>
          <label htmlFor="highlight">Highlight</label>
          <select 
            id="highlight" 
            name="highlight" 
            defaultValue={data?.highlight && data?.highlight}
            {...register('highlight')} >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.highlight && <span className="error">{errors.highlight?.message}</span>}
        </p>

        <p>
          <label htmlFor="deleted">Deleted</label>
          <select 
            id="deleted" 
            name="deleted" 
            defaultValue={data?.deleted ? data?.deleted : 'false'}
            {...register('deleted')} >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          {errors.deleted && <span className="error">{errors.deleted?.message}</span>}
        </p>

        <p className="action_btn submit_btn">
          <button className="add_btn" type="submit">Submit</button>
        </p>
      </form>

      {/* ===========Form End===========*/}
    </div>

  )
}

export default PortfolioForm;
