import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import CommonModal from './CommonModal';
import ColorTable from '../table/ColorTable';
import Stores from '../../stores';
import HTTP from '../../apiClient';

export default function ProductModal({
  open,
  onClose,
  title,
}) {
  const { categoryStore, productStore }  = Stores();
  
  const [submitted, setSubmitted] = useState(false);
  
  // Define initial form state
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    colors: [],
    price: '',
    size: [],
    weight: '',
    featureCodes: [],
    materialCodes: [],
    careCodes: [],
    categoryCodes: [],
  });
  
  // Define form error state
  const [formError, setFormError] = useState({
    title: false,
    desc: false,
    colors: false,
    price: false,
    size: false,
    weight: false,
    featureCodes: false,
    materialCodes: false,
    careCodes: false,
    categoryCodes: false,
  });
  
  // Function to handle form close
  useEffect(() => {
    setFormData({
      title: '',
      desc: '',
      colors: [],
      price: '',
      size: [],
      weight: '',
      featureCodes: [],
      materialCodes: [],
      careCodes: [],
      categoryCodes: [],
    });
    
    setSubmitted(false);
  }, [onClose]);

  // Function to handle form change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Define initial color state
  const [titleKey, setTitleKey] = useState(Date.now());
  const [imageKey, setImageKey] = useState(Date.now() + 1);
  const [colorData, setColorData] = useState({
    title: '',
    image: '',
  });

  // Function to handle color change
  const handleTitleChange = (event) => {
    setColorData({ ...colorData, [event.target.name]: event.target.value });
  };

  // Function to handle image change
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setColorData({ ...colorData, image: e.target.files[0] });
    }
  };

  // Function to handle color add
  const handleColorAdd = () => {
    const color = {
      id: formData.colors.length + 1,
      title: colorData.title,
      image: colorData.image,
    };
  
    setFormData({
      ...formData,
      colors: [...formData.colors, color],
    });

    // Reset color input after adding
    setColorData({ title: '', image: '' });

    // Reset key to re-render file input
    setTitleKey(Date.now());
    setImageKey(Date.now() + 1);
  };

  // Function to validate form
  const validateForm = () => {
    let errors = {};

    for (const field in formData) {
      if (field === 'desc') continue;
      
      if (Array.isArray(formData[field])) {
        if (formData[field].length === 0) {
          errors[field] = true;
        }
      } else {
        if (!formData[field]) {
          errors[field] = true;
        }
      }
    }

    setFormError(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submit
  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);

      try {
        const form = new FormData();
        
        form.append('title', formData.title);
        form.append('desc', formData.desc);
        form.append('price', formData.price);
        form.append('weight', formData.weight);
        form.append('size', JSON.stringify(formData.size));
        form.append('featureCodes', JSON.stringify(formData.featureCodes));
        form.append('materialCodes', JSON.stringify(formData.materialCodes));
        form.append('careCodes', JSON.stringify(formData.careCodes));
        form.append('categoryCodes', JSON.stringify(formData.categoryCodes));
        
        formData.colors.forEach((color, index) => {
          form.append(`colors[${index}].title`, color.title);
          form.append(`colors[${index}].image`, color.image);
        });
  
        const response = await HTTP.post('/api/product', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
        onClose();
        
      } catch (error) {
        console.error(error);
        alert(error.response.data.error);
      }
    }
  };

  return (
    <CommonModal
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      title={title}
    >
      <Box component="form" noValidate autoComplete="off" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          {/* title */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="제품명"
              name="title"
              inputProps={{ maxLength: 50 }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.title}
              helperText={submitted && formError.title && '제품명은 필수항목 입니다.'}
            />
          </Grid>

          {/* desc */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={5}
              id="desc"
              label="소개글"
              name="desc"
              inputProps={{ maxLength: 500 }}
              onChange={handleChange}
            />
          </Grid>

          {/* colors */}
          <Grid item xs={8}>
            <ColorTable rows={formData.colors} />
          </Grid>

          {/* add color */}
          <Grid item xs={4}>
            {/* color */}
            <TextField
              fullWidth
              key={titleKey}
              id="title"
              label="색상"
              name="title"
              inputProps={{ maxLength: 50 }}
              onChange={handleTitleChange}
              error={submitted && formError.colors}
              sx={{ mb: 1 }}
            />

            {/* image */}
            <TextField
              fullWidth
              key={imageKey}
              type="file"
              id="image"
              name="image"
              onChange={handleImageChange}
            />

            {/* button */}
            <Button
              onClick={handleColorAdd}
              sx={{ float: 'right' }}
            >
              색상 추가
            </Button>
            {submitted && formError.colors && <FormHelperText error>색상은 필수항목 입니다.</FormHelperText>}
          </Grid>

          {/* price */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="price"
              label="가격"
              name="price"
              inputProps={{ maxLength: 50 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    ₩
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.price}
              helperText={submitted && formError.price && '가격은 필수항목 입니다.'}
            />
          </Grid>

          {/* size */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.size}>
              <InputLabel>사이즈</InputLabel>
              <Select
                multiple
                value={formData.size}
                onChange={handleChange}
                onClose={validateForm}
                name="size"
                label="사이즈"
                error={submitted && formError.size}
              >
                <MenuItem value={'XSS'}>XXS</MenuItem>
                <MenuItem value={'XS'}>XS</MenuItem>
                <MenuItem value={'SM'}>SM</MenuItem>
                <MenuItem value={'MD'}>MD</MenuItem>
                <MenuItem value={'LG'}>LG</MenuItem>
                <MenuItem value={'1XL'}>1XL</MenuItem>
                <MenuItem value={'2XL'}>2XL</MenuItem>
              </Select>
              {submitted && formError.size && <FormHelperText>사이즈는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* weight */}
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="weight"
              label="무게"
              name="weight"
              inputProps={{ maxLength: 50 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    g
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              onBlur={validateForm}
              error={submitted && formError.weight}
              helperText={submitted && formError.weight && '무게는 필수항목 입니다.'}
            />
          </Grid>

          {/* featureCodes */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.featureCodes}>
              <InputLabel>특징</InputLabel>
              <Select
                multiple
                value={formData.featureCodes}
                onChange={handleChange}
                name="featureCodes"
                label="특징"
                error={submitted && formError.featureCodes}
              >
                {productStore.features.map((feature) => (
                  <MenuItem key={feature.code} value={feature.code}>
                    {feature.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.featureCodes && <FormHelperText>특징은 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* materialCodes */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.materialCodes}>
              <InputLabel>소재</InputLabel>
              <Select
                multiple
                value={formData.materialCodes}
                onChange={handleChange}
                name="materialCodes"
                label="소재"
                error={submitted && formError.materialCodes}
              >
                {productStore.materials.map((material) => (
                  <MenuItem key={material.code} value={material.code}>
                    {material.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.materialCodes && <FormHelperText>소재는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* careCodes */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.careCodes}>
              <InputLabel>관리</InputLabel>
              <Select
                multiple
                value={formData.careCodes}
                onChange={handleChange}
                name="careCodes"
                label="관리"
                error={submitted && formError.careCodes}
              >
                {productStore.cares.map((care) => (
                  <MenuItem key={care.code} value={care.code}>
                    {care.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.careCodes && <FormHelperText>관리는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* categories */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.categoryCodes}>
              <InputLabel>카테고리</InputLabel>
              <Select
                multiple
                value={formData.categoryCodes}
                onChange={handleChange}
                name="categoryCodes"
                label="카테고리"
                error={submitted && formError.categoryCodes}
              >
                {categoryStore.categories.flatMap((category, index) => {
                  const isFirstCategory = index === 0 || category.group.code !== categoryStore.categories[index - 1].group.code;
                  const nextCategory = categoryStore.categories[index + 1];
                  const items = [
                    isFirstCategory && (
                      <MenuItem disabled key={`group-title-${category.code}`}>
                        {category.group.title}
                      </MenuItem>
                    ),
                    <MenuItem value={category.code} key={`menu-item-${category.code}`}>
                      {category.title}
                    </MenuItem>
                  ];
                  if (nextCategory && category.group.code !== nextCategory.group.code) {
                    items.push(<Divider sx={{ my: 0.5 }} key={`divider-${category.code}`} />);
                  }
                  return items;
                })}
              </Select>
              {submitted && formError.categoryCodes && <FormHelperText>카테고리는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </CommonModal>
  );
}