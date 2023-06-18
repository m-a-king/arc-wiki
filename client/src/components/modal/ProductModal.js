import * as React from 'react';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
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
    color: [],
    price: '',
    size: [],
    weight: '',
    feature: [],
    material: [],
    care: [],
    category: [],
  });
  
  // Define form error state
  const [formError, setFormError] = useState({
    title: false,
    desc: false,
    color: false,
    price: false,
    size: false,
    weight: false,
    feature: false,
    material: false,
    care: false,
    category: false,
  });
  
  // Function to handle form close
  useEffect(() => {
    setSubmitted(false);
    setFormData({
      title: '',
      desc: '',
      color: [],
      price: '',
      size: [],
      weight: '',
      feature: [],
      material: [],
      care: [],
      category: [],
    });
  }, [onClose]);

  // Function to handle form change
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Define initial color state
  const [colorKey, setColorKey] = useState(Date.now());
  const [imageKey, setImageKey] = useState(Date.now() + 1);
  const [colorData, setColorData] = useState({
    color: '',
    image: '',
  });

  // Function to handle color change
  const handleColorChange = (event) => {
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
    setFormData({ 
      ...formData, 
      color: [...formData.color, { id: formData.color.length + 1, color: colorData.color, image: colorData.image }] 
    });

    // Reset color input after adding
    setColorData({ color: '', image: '' });

    // Reset key to re-render file input
    setColorKey(Date.now());
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
  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (validateForm()) {
      setSubmitted(false);

      try {
        onClose();
        
      } catch (error) {
        console.error(error);
        alert(error.response.data.message);
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
            <ColorTable rows={formData.color} />
          </Grid>

          {/* add color */}
          <Grid item xs={4}>
            {/* color */}
            <TextField
              fullWidth
              key={colorKey}
              id="color"
              label="색상"
              name="color"
              inputProps={{ maxLength: 50 }}
              onChange={handleColorChange}
              error={submitted && formError.color}
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
            {submitted && formError.color && <FormHelperText error>색상은 필수항목 입니다.</FormHelperText>}
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

          {/* feature */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.feature}>
              <InputLabel>특징</InputLabel>
              <Select
                multiple
                value={formData.feature}
                onChange={handleChange}
                name="feature"
                label="특징"
                error={submitted && formError.feature}
              >
                {productStore.features.map((feature) => (
                  <MenuItem key={feature.code} value={feature.code}>
                    {feature.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.feature && <FormHelperText>특징은 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* material */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.material}>
              <InputLabel>소재</InputLabel>
              <Select
                multiple
                value={formData.material}
                onChange={handleChange}
                name="material"
                label="소재"
                error={submitted && formError.material}
              >
                {productStore.materials.map((material) => (
                  <MenuItem key={material.code} value={material.code}>
                    {material.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.material && <FormHelperText>소재는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* care */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.care}>
              <InputLabel>관리</InputLabel>
              <Select
                multiple
                value={formData.care}
                onChange={handleChange}
                name="care"
                label="관리"
                error={submitted && formError.care}
              >
                {productStore.cares.map((care) => (
                  <MenuItem key={care.code} value={care.code}>
                    {care.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.care && <FormHelperText>관리는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>

          {/* categories */}
          <Grid item xs={12}>
            <FormControl fullWidth error={submitted && formError.category}>
              <InputLabel>카테고리</InputLabel>
              <Select
                multiple
                value={formData.category}
                onChange={handleChange}
                name="category"
                label="카테고리"
                error={submitted && formError.category}
              >
                {categoryStore.categories.map((category) => (
                  <MenuItem key={category.code} value={category.code}>
                    {category.title}
                  </MenuItem>
                ))}
              </Select>
              {submitted && formError.category && <FormHelperText>카테고리는 필수항목 입니다.</FormHelperText>}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </CommonModal>
  );
}