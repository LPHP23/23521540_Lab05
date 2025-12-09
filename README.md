# React Lab 5 – Advanced Exercises

Dự án React nâng cao với các best practices và patterns hiện đại.

## 🚀 Tính năng chính

### 1. **Redux Toolkit - Cart Management** (`cartSlice.js`)
- ✅ State management với Redux Toolkit
- ✅ Async thunks cho xử lý discount codes
- ✅ Memoized selectors với `createSelector`
- ✅ Error handling và validation
- ✅ Floating-point precision handling

### 2. **LoginForm Component** (`LoginForm.js`)
- ✅ Form validation với email và password
- ✅ Async submission với loading states
- ✅ Accessibility (ARIA labels, roles)
- ✅ PropTypes validation
- ✅ Success/error feedback

### 3. **Modal Component** (`Modal.js`)
- ✅ React 18 `createPortal` API
- ✅ Focus trap và keyboard navigation
- ✅ Click outside để đóng
- ✅ ESC key handler
- ✅ Body scroll prevention
- ✅ Full accessibility (ARIA)

### 4. **UserProfile Component** (`UserProfile.js`)
- ✅ Custom hook `useFetchUser` với retry logic
- ✅ Exponential backoff cho retries
- ✅ Timeout handling với AbortController
- ✅ Loading skeleton UI
- ✅ Error boundary ready
- ✅ Refetch capability

### 5. **Tabs Component** (`Tabs.js`)
- ✅ Compound component pattern
- ✅ Full keyboard navigation
- ✅ ARIA roles và attributes
- ✅ Disabled state support
- ✅ Context API với useMemo optimization
- ✅ Unique IDs với useId

### 6. **Reducer Pattern** (`reducer.js`)
- ✅ Type-safe action creators
- ✅ Status constants
- ✅ JSDoc documentation
- ✅ Development warnings
- ✅ State machine pattern

### 7. **Custom Hooks**
- ✅ `useLocalStorage` - Persistent state với cross-tab sync
- ✅ `useDebounce` - Debounced values

### 8. **Error Boundary** (`ErrorBoundary.js`)
- ✅ React Error Boundary pattern
- ✅ Custom fallback UI
- ✅ Error logging capability
- ✅ Reset functionality

## 📦 Cài đặt

```bash
# Clone repository
git clone <repository-url>

# Di chuyển vào thư mục
cd react_lab5

# Cài đặt dependencies
npm install

# Chạy development server
npm start
```

## 🧪 Testing

```bash
# Chạy tests
npm test

# Chạy tests với coverage
npm test -- --coverage
```

## 🏗️ Cấu trúc dự án

```
react_lab5/
├── src/
│   ├── App.js                    # Main app component
│   ├── index.js                  # Entry point
│   ├── store.js                  # Redux store config
│   ├── cartSlice.js             # Redux cart slice
│   ├── LoginForm.js             # Login form component
│   ├── LoginForm.test.js        # Login form tests
│   ├── Modal.js                 # Modal component
│   ├── Tabs.js                  # Tabs compound component
│   ├── UserProfile.js           # User profile component
│   ├── reducer.js               # Generic reducer
│   ├── ErrorBoundary.js         # Error boundary component
│   ├── styles.css               # Global styles
│   └── hooks/
│       ├── useLocalStorage.js   # localStorage hook
│       └── useDebounce.js       # Debounce hook
├── package.json
└── README.md
```

## 🎯 Best Practices được áp dụng

1. **Performance Optimization**
   - Memoization với `useMemo`, `useCallback`
   - Redux selectors với `createSelector`
   - Lazy loading components

2. **Accessibility (A11y)**
   - Semantic HTML
   - ARIA roles và attributes
   - Keyboard navigation
   - Focus management

3. **Error Handling**
   - Error boundaries
   - Try-catch blocks
   - User-friendly error messages
   - Retry mechanisms

4. **Type Safety**
   - PropTypes validation
   - JSDoc comments
   - Constants for types

5. **Code Organization**
   - Custom hooks
   - Compound components
   - Separation of concerns
   - DRY principle

6. **Testing**
   - Unit tests với React Testing Library
   - User event simulation
   - Accessibility testing

## 📚 Công nghệ sử dụng

- **React 18** - UI library với concurrent features
- **Redux Toolkit** - State management
- **React Testing Library** - Testing utilities
- **PropTypes** - Runtime type checking
- **CSS3** - Animations và responsive design

## 🔧 Scripts có sẵn

```bash
npm start      # Chạy development server
npm test       # Chạy test suite
npm run build  # Build cho production
npm run lint   # Chạy ESLint
npm run format # Format code với Prettier
```

## 📝 Notes

- Tất cả components đều có accessibility support
- Error handling được implement ở mọi cấp độ
- Performance optimized với memoization
- Responsive design cho mobile và desktop
- Cross-browser compatible

## 🎓 Học hỏi thêm

Để tìm hiểu thêm về các patterns và best practices được sử dụng:

- [React Documentation](https://react.dev)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Testing Library](https://testing-library.com/react)
- [Web Accessibility](https://www.w3.org/WAI/)

---

**Author**: Advanced React Lab  
**Version**: 1.0.0  
**Last Updated**: December 2025# 23521540_Lab05
