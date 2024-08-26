import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SelectedPortfolioContext } from "../../contexts/SelectedPortfolioContext";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import { updatePortfolioApi } from "../../services/portfolioApi";

// validate input data 
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

const PortfolioEdit = () => {

  const portfolioId = useParams();
  const navigate = useNavigate();

  // load data from database
  const {data, loading, error, updateId} = useContext(SelectedPortfolioContext);

  // apply form validation and handle submit
  const { register, handleSubmit, formState: { errors }, setValue, resetField } = useForm({
    resolver: yupResolver(schema)
  });

  // new thumbnail state
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  
  useEffect(() => {
    if(portfolioId) {
      updateId(portfolioId.id);
    }

  }, [updateId, portfolioId]);

  // Thumbnail upload and preview
  const handleThumbnailChange = (e) => {
    e.preventDefault();
    
    const file = e.target.files[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    setThumbnail(file);
    setThumbnailPreview(preview);
    setValue('thumbnail', file);
  }

  // remove image in thumbnail upload field 
  const removeThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    resetField('thumbnail');
  }

  // Multi images upload and preview
  const handleImagesChange = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);

    if (!files) return;

    const preview = files.map(file => URL.createObjectURL(file));
    
    setSelectedImages(files);
    setImagePreview(preview);
    setValue('images', files); // Manually set the files in react-hook-form
  }

  // remove selected image in multi images upload field 
  const removeImages = (index) => {
    const newSelectedFiles = selectedImages.filter((_, i) => i !== index);
    const newImagesPreviews = imagePreview.filter((_, i) => i !== index);
   
    setSelectedImages(newSelectedFiles);
    setImagePreview(newImagesPreviews);
    if(newSelectedFiles.length > 0) {
      setValue('images', newSelectedFiles); // Update form data in react-hook-form
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

    try {
      const sendFormToServer = updatePortfolioApi('portfolio-edit', id, formData);
      
      if (sendFormToServer) {
        navigate("../admin/portfolio-list");
      }

    } catch (err) {
      alert('Error: ' + err.message);
    }

  }

  if (loading) return (<><Loading /></>);

  if (error) return (<><Error /></>);

  return (
    <>
      <section id="admin_edit" className="section_white">
        <div className="wrapper">
          <div className="content">
            
            <h1>Portfolio Edit</h1>
            
            <div className="admin_form">
              
              {/* ===========Form Started===========*/}
              <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" noValidate>
                <p>
                  <span className="left">Id</span>
                  <span className="right">{data?._id}</span>
                  <input type="hidden" name="id" defaultValue={data?._id} {...register('_id')} />
                </p>
       
                <p>
                  <label htmlFor="title">Title</label>
                  <input 
                    type="text" 
                    name="title" 
                    id="title" 
                    defaultValue={data?.title} 
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
                  {errors.thumbnail && <span className="error">{errors.thumbnail?.message}</span>}
                </p>

                <div>
                  <div className="left"></div>
                  <div className="right">
                    <img src={'http://127.0.0.1:4000' + data?.thumbnail}
                      alt={data?.title} width={60}/>
                  </div>
                </div>

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

                  {errors.images && <span className="error">{errors.images?.message}</span>}  
                </p>
                {
                  data?.images && <div>
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
                    defaultValue={data?.desc_short}
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
                    defaultValue={data?.desc_long}
                    {...register('desc_long')} ></textarea>
                  <span className="reminder">Limit: 1000 words</span>
                  {errors.desc_long && <span className="error">{errors.desc_long?.message}</span>}  
                </p>

                <p>
                  <label htmlFor="tags">Technology tags</label>
                  <input 
                    type="text" 
                    name="tags" 
                    id="tags" 
                    defaultValue={data?.tags}
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
                    defaultValue={data?.slug}
                    {...register('slug')} />
                  {errors.slug && <span className="error">{errors.slug?.message}</span>}
                </p>

                <p>
                  <label htmlFor="highlight">Highlight</label>
                  <select 
                    id="highlight" 
                    name="highlight" 
                    defaultValue={data?.highlight}
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
                    defaultValue={data?.deleted}
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
              
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioEdit;
