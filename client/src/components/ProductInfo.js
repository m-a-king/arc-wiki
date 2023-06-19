import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import ItemTabs from '../components/tab/ItemTabs';
import { Observer } from "mobx-react-lite";
import Stores from '../stores';
import HTTP from '../apiClient';

export default function ProductInfo() {
  const { categoryStore, productStore }  = Stores();
  const { idx } = useParams();

  // Define initial product state
  const [product, setProduct] = useState({});
  
  const fetchProduct = useCallback(async () => {
    try {
      const response = await HTTP.get(`/api/product/${idx}`);
      setProduct(response.data);
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  }, [idx]);

  // mounted
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // Define initial value state
  const [value, setValue] = useState('0');

  return (
    <Observer>{() => (
      <Box>
        {/* Image */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {product.colors ? (
            <ItemTabs
              colors={product.colors}
              mainWidth={496}
              subWidth={70}
              value={value}
              setValue={setValue}
            />
          ) : '-'}
        </Box>
        
        {/* Information */}
        <TableContainer component={Paper} sx={{ mt: 6 }}>
          <Table>
            <TableBody>
              <TableRow>
                {/* title */}
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  제품명
                </TableCell>
                <TableCell>
                  {product.title}
                </TableCell>
              </TableRow>

              {/* desc */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  소개글
                </TableCell>
                <TableCell>
                  {product.desc}
                </TableCell>
              </TableRow>
              
              {/* price */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  가격
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('ko-KR', {
                    style: 'currency',
                    currency: 'KRW',
                  }).format(parseFloat(product.price))}
                </TableCell>
              </TableRow>
              
              {/* colors */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  색상
                </TableCell>
                <TableCell>
                  {product.colors ? product.colors[value]?.title : '-'}
                </TableCell>
              </TableRow>
              
              {/* size */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  사이즈
                </TableCell>
                <TableCell>
                  {product.size ? JSON.parse(product.size).join(', ') : '-'}
                </TableCell>
              </TableRow>
              
              {/* weight */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  무게
                </TableCell>
                <TableCell>
                  {new Intl.NumberFormat('ko-KR', {
                    maximumFractionDigits: 2,
                  }).format(parseFloat(product.weight))}
                  g
                </TableCell>
              </TableRow>
              
              {/* feature */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  특징
                </TableCell>
                <TableCell>
                  {product.featureCodes ? (
                    JSON.parse(product.featureCodes).map((featureCode) => {
                      const feature = productStore.features.find((f) => f.code === featureCode);
                      return feature ? (
                        <Tooltip key={feature.code} title={feature.desc} arrow>
                          <Chip label={feature.title} sx={{ mr: 1}} />
                        </Tooltip>
                      ) : '-' ;
                    })
                  ) : '-'}
                </TableCell>
              </TableRow>
              
              {/* material */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  소재
                </TableCell>
                <TableCell>
                  {product.materialCodes ? (
                    JSON.parse(product.materialCodes).map((materialCode) => {
                      const material = productStore.materials.find((m) => m.code === materialCode);
                      return material ? (
                        <Tooltip key={material.code} title={material.desc} arrow>
                          <Chip label={material.title} sx={{ mr: 1}} />
                        </Tooltip>
                      ) : '-';
                    })
                  ) : '-'}
                </TableCell>
              </TableRow>
              
              {/* care */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  관리
                </TableCell>
                <TableCell>
                  {product.careCodes ? (
                    JSON.parse(product.careCodes).map((careCode) => {
                      const care = productStore.cares.find((c) => c.code === careCode);
                      return care ? (
                        <Tooltip key={care.code} title={care.desc} arrow>
                          <Chip label={care.title} sx={{ mr: 1}} />
                        </Tooltip>
                      ) : '-';
                    })
                  ) : '-'}
                </TableCell>
              </TableRow>
              
              {/* category */}
              <TableRow>
                <TableCell component="th" scope="row" sx={{ fontWeight: 'bold' }}>
                  카테고리
                </TableCell>
                <TableCell>
                  {product.categoryCodes ? (
                    JSON.parse(product.categoryCodes).map((categoryCode, index) => {
                      const category = categoryStore.categories.find((c) => c.code === categoryCode);
                      const isLastItem = index === JSON.parse(product.categoryCodes).length - 1;
                      return category ? (
                        <Card key={category.code} sx={{ display: 'flex', mb: isLastItem ? 0 : 1 }}>
                          {/* Image */}
                          <CardContent>
                            <CardMedia
                              component="img"
                              image={category.icon.replace('_w.png', '.jpg')}
                              sx={{ width: 50, heihgt: 50 }}
                            />
                          </CardContent>
          
                          {/* Desc */}
                          <CardContent>
                            <Typography gutterBottom variant="button" sx={{ fontWeight: 'bold' }}>
                              {category.title}
                            </Typography>
                            <Typography variant="body2">
                              {category.desc}
                            </Typography>
                          </CardContent>
                        </Card>
                      ) : '-';
                    })
                  ) : '-'}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )}</Observer>
  );
}