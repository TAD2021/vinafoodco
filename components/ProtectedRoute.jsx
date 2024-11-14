'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { decodeToken } from 'react-jwt'; // Thêm thư viện để giải mã token

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const checkAuthentication = () => {
      if (!isAuthenticated || !accessToken) {
        router.push('/admin/login');
      } else {
        const decoded = decodeToken(accessToken);
        // Kiểm tra nếu token hết hạn
        if (!decoded || decoded.exp * 1000 < Date.now()) {
          // Token đã hết hạn
          router.push('/admin/login');
        }
      }
    };

    checkAuthentication();
  }, [isAuthenticated, accessToken, router]);

  // Nếu chưa xác thực, có thể trả về null hoặc một spinner loading
  if (!isAuthenticated || !accessToken) {
    return null; // Hoặc có thể trả về một loading spinner
  }

  return children; // Nếu đã xác thực, render children
};

export default ProtectedRoute;
