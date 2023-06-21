import sequelize from '../config/db.js';
import Feature from '../models/Feature.js';
import Material from '../models/Material.js';
import Care from '../models/Care.js';
import Product from '../models/Product.js';
import Color from '../models/Color.js';
import Review from '../models/Review.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';

export const getFeatures = async (req, res) => {
  try {
    const features = await Feature.findAll();
    res.json(features);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getMaterials = async (req, res) => {
  try {
    const materials = await Material.findAll();
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getCares = async (req, res) => {
  try {
    const cares = await Care.findAll();
    res.json(cares);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getProducts = async (req, res) => {
  try {
    // 1. 요청 쿼리에서 codes 파라미터를 추출합니다.
    const codes = req.query.codes ? req.query.codes.split(',') : null;

    // 2. 제품 정보를 조회합니다.
    const products = await Product.findAll({
      where: codes ? sequelize.literal(`JSON_CONTAINS(category_codes, '${JSON.stringify(codes)}')`) : {},
      include: [{
        model: Color,
        required: true,
        as: 'colors',
      }],
      order: [
        ['createDate', 'DESC'],
        [{ model: Color, as: 'colors' }, 'idx', 'ASC'],
      ],
    });
    
    // 3. 제품 정보를 응답합니다.
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    // 4. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { idx } = req.params;

    // 1. idx로 제품 조회
    const product = await Product.findByPk(idx, {
      include: [
        {
          model: Color,
          as: 'colors',
        },
      ],
    });
    if (!product) {
      return res.status(404).json({ error: '제품을 찾을 수 없습니다.' });
    }

    // 2. 제품 정보를 응답
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    // 3. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = req.body;
    
    // 1. 상품 생성
    const createdProduct = await Product.create(product);

    // 2. 상품 색상 정보 생성 후 DB에 추가
    const colors = req.files.map((file, index) => ({
      productIdx: createdProduct.idx,
      title: req.body[`colors[${index}].title`],
      image: `/colors/${file.filename}`,
    }));
    await Color.bulkCreate(colors);
    
    // 3. 성공 응답 반환
    res.status(201).json(createdProduct);
  } catch (error) {
    // 4. 오류 발생 시, 오류 메시지 반환
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getReviews = async (req, res) => {
  try {
    const { idx } = req.params;

    // 1. 리뷰 정보 조회
    const reviews = await Review.findAll({
      where: idx ? {
        product_idx: idx,
      } : {},
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['idx', 'title'],
        },
      ],
      order: [
        ['createDate', 'DESC'],
      ],
    });
    
    // 2. 리뷰 정보를 응답
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    // 3. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    // 1. 현재 사용자의 리뷰 목록 가져오기
    const reviews = await Review.findAll({
      where: {
        userIdx: req.user.idx,
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['idx', 'title'],
        },
      ],
      order: [
        ['createDate', 'DESC'],
      ],
    });
    
    // 2. 리뷰 목록을 응답
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getReview = async (req, res) => {
  try {
    const { idx } = req.params;
    
    // 1. idx로 리뷰 조회
    const review = await Review.findByPk(idx, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          model: Product,
          as: 'product',
          attributes: ['idx', 'title'],
        },
      ],
    });
    
    // 2. 리뷰를 찾지 못한 경우, 404 상태 코드와 에러 메시지를 응답
    if (!review) {
      return res.status(404).json({ error: '리뷰를 찾을 수 없습니다.' });
    }
    
    // 3. 리뷰 정보를 응답
    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    // 4. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const addReview = async (req, res) => {
  try {
    // 1. 요청 바디에서 리뷰 정보 추출
    const review = req.body;
    review.userIdx = req.user.idx;
    review.image = `/review/${req.file.filename}`;

    // 2. 리뷰 생성
    const createdReview = await Review.create(review);

    // 3. 생성된 리뷰 정보를 응답
    res.status(201).json(createdReview);
  } catch (error) {
    console.error(error);
    // 4. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const deleteReviews = async (req, res) => {
  try {
    const { idxs } = req.body;

    // 1. 선택한 리뷰를 삭제합니다.
    await Review.destroy({
      where: {
        idx: idxs,
      },
    });

    // 2. 삭제 완료 메시지를 응답합니다.
    res.status(200).json({ message: '리뷰가 삭제되었습니다.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getComments = async (req, res) => {
  try {
    const { idx } = req.params;

    // 1. 댓글 정보 조회
    const comments = await Comment.findAll({
      where: idx ? {
        review_idx: idx,
      } : {},
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          model: Review,
          as: 'review',
          attributes: ['idx', 'title'],
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['idx', 'title'],
            }
          ]
        },
      ],
      order: [
        ['createDate', 'DESC'],
      ],
    });
    
    // 2. 댓글 정보를 응답
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    // 3. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const getMyComments = async (req, res) => {
  try {
    // 1. 로그인된 사용자의 댓글 조회
    const comments = await Comment.findAll({
      where: {
        userIdx: req.user.idx,
      },
      include: [
        {
          // 2. 댓글 작성자 정보 포함
          model: User,
          as: 'user',
          attributes: ['idx', 'id', 'name', 'nickname'],
        },
        {
          // 3. 댓글이 달린 리뷰와 해당 상품 정보 포함
          model: Review,
          as: 'review',
          attributes: ['idx', 'title'],
          include: [{
            model: Product,
            as: 'product',
            attributes: ['idx', 'title'],
          }]
        },
      ],
      order: [
        // 4. 댓글을 최신 순서대로 정렬
        ['createDate', 'DESC'],
      ],
    });
    
    // 5. 조회된 댓글 정보 클라이언트에 반환
    res.status(200).json(comments);
  } catch (error) {
    // 6. 오류 발생 시, 오류 메시지 반환
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const addComment = async (req, res) => {
  try {
    // 1. 요청 바디에서 댓글 정보 추출
    const comment = req.body;
    comment.userIdx = req.user.idx;

    // 2. 댓글 생성
    const createdComment = await Comment.create(comment);

    // 3. 생성된 댓글 정보를 응답
    res.status(201).json(createdComment);
  } catch (error) {
    console.error(error);
    // 4. 서버 오류 응답 반환
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};

export const deleteComments = async (req, res) => {
  try {
    const { idxs } = req.body;

    // 1. 요청 받은 댓글의 idx에 해당하는 댓글 삭제
    await Comment.destroy({
      where: {
        idx: idxs,
      },
    });

    // 2. 성공 메시지를 클라이언트에 반환
    res.status(200).json({ message: '댓글이 삭제되었습니다.' });
  } catch (error) {
    // 3. 오류 발생 시, 오류 메시지를 클라이언트에게 반환
    console.error(error);
    res.status(500).json({ error: '서버 내부에서 오류가 발생하였습니다.' });
  }
};