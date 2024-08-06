import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SelectedPortfolioContext } from "../../contexts/SelectedPortfolioContext";
import Loading from "../../components/common/Loading";
import Error from "../../components/common/Error";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import DOMPurify from "dompurify";
import { updatePortfolioApi } from "../../services/portfolioApi";

// validate input data 
const schema = yup.object().shape({
  title: yup.string().required('Title is required').max(50, 'Title must be under 50 charactors.'),
  // thumbnail: yup.string(),
  // existing_thumbnail: yup.string(),
  // images: yup.string(),
  // existing_images: yup.array(),
  desc_short: yup.string().required('Short Desc is required').max(200, 'Short Desc must be under 200 charactors.'),
  desc_long: yup.string().required('Long Desc is required').max(3000, 'Long Desc must be under 3000 charactors.'),
  tags: yup.string().required('Tags is required'),
  slug: yup.string().required('Slug is required').max(50, 'Slug must be under 50 charactors.')
});

const PortfolioEdit = () => {

  const portfolioId = useParams();
  const {data, loading, error, updateId} = useContext(SelectedPortfolioContext);
  const { register, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });
  
  useEffect(() => {
    if(portfolioId) {
      updateId(portfolioId.id);
    }

  }, [updateId, portfolioId]);


  // Submit form to the server
  const onSubmit = (newData) => {

    // ------ Sanitize input data ------ //
    const sanitizedData = {
      title: DOMPurify.sanitize(newData.title),
      // thumbnail: DOMPurify.sanitize(newData.existing_thumbnail),
      // images: DOMPurify.sanitize(newData.existing_images),
      desc_short: DOMPurify.sanitize(newData.desc_short),
      desc_long: DOMPurify.sanitize(newData.desc_long),
      tags: DOMPurify.sanitize(newData.tags),
      slug: DOMPurify.sanitize(newData.slug),
      highlight: DOMPurify.sanitize(newData.highlight),
      deleted: DOMPurify.sanitize(newData.deleted),
    }

    // ------ fotmat data ------- //
    const id = DOMPurify.sanitize(newData._id);
    sanitizedData.tags = sanitizedData.tags.split('|');
    sanitizedData.highlight = sanitizedData.highlight === 'true' ? true : false;
    sanitizedData.deleted = sanitizedData.deleted === 'true' ? true : false;

    try {
      updatePortfolioApi('portfolio-edit', id, sanitizedData);
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
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <p>
                  <span className="title">Id</span>
                  <span className="value">{data?._id}</span>
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
                      accept=".png,.jpg,.jpeg,.webp,image/png" 
                      {...register('thumbnail')} />
                    {/* <?php if(isset($product['image'])) : ?> */}
                    <input 
                      type="hidden" 
                      name="existing_thumbnail" 
                      defaultValue={data?.thumbnail} 
                      {...register('existing_thumbnail')} />

                    <img src={require('../../assets/images/' + data?.thumbnail)}
                      alt={data?.title} />
                      
                    {/* <?php endif; ?> */}
                  </span>
                  {errors.thumbnail && <span className="error">{errors.thumbnail?.message}</span>}
                </p>

                <p> 
                  <label htmlFor="images">All Images</label>
                  <span className="upload_img">
                    <input 
                      type="file" 
                      name="images" 
                      id="images" 
                      accept=".png,.jpg,.jpeg,.webp,image/png"
                      {...register('images')} />

                    {/* <?php if(isset($product['image'])) : ?> */}
                    <input 
                      type="hidden"
                      name="existing_images" 
                      defaultValue={data?.images[0]}
                      {...register('existing_images')} />

                    {
                      data?.images.map((item, index) => {
                        return (
                          <span key={index}>
                            <img src={require('../../assets/images/' + item)}
                            alt={item} />
                          </span>
                        )
                      })
                    }
                      
                    {/* <?php endif; ?> */}

                  </span>
                  {errors.images && <span className="error">{errors.images?.message}</span>}  
                </p>

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
                    defaultValue={data?.tags.join('|')}
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
            </div>
              
          </div>
        </div>
      </section>
    </>
  )
}

export default PortfolioEdit;
