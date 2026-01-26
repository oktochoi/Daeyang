'use client'

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  getPerformanceProjectById, 
  createPerformanceProjectItem,
  getPerformanceProjectItems,
  deletePerformanceProjectItem,
  uploadImage,
  PerformanceProject,
  PerformanceProjectItem
} from '@/lib/supabase';

export default function PerformanceProjectManagePage() {
  const { t, i18n } = useTranslation();
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id ? parseInt(params.id as string) : null;
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [project, setProject] = useState<PerformanceProject | null>(null);
  const [items, setItems] = useState<PerformanceProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemForm, setItemForm] = useState({
    item_title: '',
    item_title_en: '',
    photos: [] as string[]
  });
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: number]: boolean }>({});

  const loadProject = useCallback(async () => {
    if (!projectId) return;
    setIsLoading(true);
    try {
      const data = await getPerformanceProjectById(projectId);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const loadItems = useCallback(async () => {
    if (!projectId) return;
    try {
      const data = await getPerformanceProjectItems(projectId);
      setItems(data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  }, [projectId]);

  // 인증 체크
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/check');
        const data = await response.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          if (projectId) {
            loadProject();
            loadItems();
          }
        } else {
          setIsAuthenticated(false);
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        router.push('/admin');
      }
    }
    checkAuth();
  }, [projectId, router, loadProject, loadItems]);

  // 인증되지 않은 경우 로딩 표시
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">인증 확인 중...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated === false) {
    return null; // 리다이렉트 중
  }

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!projectId || !itemForm.item_title || itemForm.photos.length === 0) {
      alert('제목과 사진은 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);
    try {
      const newItem = {
        project_id: projectId,
        item_title: itemForm.item_title,
        item_title_en: itemForm.item_title_en || undefined,
        photos: itemForm.photos,
        display_order: items.length
      };

      const created = await createPerformanceProjectItem(newItem);
      if (created) {
        alert('항목이 추가되었습니다.');
        setItemForm({
          item_title: '',
          item_title_en: '',
          photos: []
        });
        loadItems();
      } else {
        alert('항목 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert('항목 추가 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteItem(itemId: number) {
    if (!confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    setIsLoading(true);
    try {
      const success = await deletePerformanceProjectItem(itemId);
      if (success) {
        alert('항목이 삭제되었습니다.');
        loadItems();
      } else {
        alert('항목 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('항목 삭제 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!projectId) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-gray-600">프로젝트 ID가 없습니다.</p>
        </div>
      </div>
    );
  }

  if (isLoading && !project) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <i className="ri-arrow-left-line text-xl"></i>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {project ? project.title : '프로젝트 관리'}
                </h1>
                <p className="text-sm text-gray-500">항목 추가 및 관리</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href={`/performance/${projectId}`}
                target="_blank"
                className="text-sm text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-2"
              >
                <i className="ri-eye-line"></i>
                미리보기
              </Link>
              <Link
                href="/admin/dashboard"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
              >
                <i className="ri-home-line"></i>
                대시보드
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Info */}
        {project && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden relative">
                {project.icon && (project.icon.startsWith('http://') || project.icon.startsWith('https://')) ? (
                  <Image src={project.icon} alt="Project icon" fill className="object-cover" unoptimized />
                ) : project.icon && !project.icon.startsWith('ri-') && project.icon.length <= 2 ? (
                  <span className="text-5xl leading-none">{project.icon}</span>
                ) : project.icon && project.icon.startsWith('ri-') ? (
                  <i className={`${project.icon} text-3xl`}></i>
                ) : (
                  <span className="text-5xl leading-none">🇰🇷</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                {project.description && (
                  <p className="text-gray-600 mt-1">{project.description}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add Item Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">항목 추가</h3>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 *
              </label>
              <input
                type="text"
                value={itemForm.item_title}
                onChange={(e) => setItemForm({ ...itemForm, item_title: e.target.value })}
                placeholder="항목 제목을 입력하세요"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제목 (영문, 선택사항)
              </label>
              <input
                type="text"
                value={itemForm.item_title_en}
                onChange={(e) => setItemForm({ ...itemForm, item_title_en: e.target.value })}
                placeholder="English title (optional)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                사진 (URL 또는 업로드) *
              </label>
              <div className="space-y-2">
                {itemForm.photos.map((photo, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="url"
                      value={photo}
                      onChange={(e) => {
                        const newPhotos = [...itemForm.photos];
                        newPhotos[index] = e.target.value;
                        setItemForm({ ...itemForm, photos: newPhotos });
                      }}
                      placeholder="https://example.com/image.jpg 또는 파일 업로드"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      required
                    />
                    <label className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 cursor-pointer transition-colors flex items-center gap-1">
                      <i className="ri-upload-line"></i>
                      <span className="text-sm">업로드</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          // 파일 크기 체크 (5MB)
                          const maxSize = 5 * 1024 * 1024; // 5MB
                          if (file.size > maxSize) {
                            alert('파일 크기는 5MB 이하여야 합니다.');
                            e.target.value = '';
                            return;
                          }

                          setUploadingFiles({ ...uploadingFiles, [index]: true });
                          try {
                            const url = await uploadImage(file, 'performance');
                            if (url) {
                              const newPhotos = [...itemForm.photos];
                              newPhotos[index] = url;
                              setItemForm({ ...itemForm, photos: newPhotos });
                            } else {
                              alert('파일 업로드에 실패했습니다.');
                            }
                          } catch (error) {
                            console.error('Error uploading file:', error);
                            alert('파일 업로드 중 오류가 발생했습니다.');
                          } finally {
                            setUploadingFiles({ ...uploadingFiles, [index]: false });
                            e.target.value = ''; // 같은 파일 다시 선택 가능하도록
                          }
                        }}
                        disabled={uploadingFiles[index]}
                      />
                    </label>
                    {uploadingFiles[index] && (
                      <div className="flex items-center px-3 text-sm text-gray-500">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-teal-600 mr-2"></div>
                        업로드 중...
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        const newPhotos = itemForm.photos.filter((_, i) => i !== index);
                        setItemForm({ ...itemForm, photos: newPhotos });
                      }}
                      className="px-3 py-2 text-red-600 hover:text-red-700"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-2 text-sm text-teal-600 hover:text-teal-700 flex items-center gap-1"
                onClick={() => {
                  setItemForm({ ...itemForm, photos: [...itemForm.photos, ''] });
                }}
              >
                <i className="ri-add-line"></i>
                사진 추가
              </button>
              <p className="text-xs text-gray-500 mt-1">
                * 파일 크기는 5MB 이하여야 합니다.
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? '추가 중...' : '항목 추가'}
            </button>
          </form>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">항목 목록 ({items.length})</h3>
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <i className="ri-inbox-line text-4xl mb-2"></i>
              <p>등록된 항목이 없습니다. 위에서 항목을 추가해주세요.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-teal-300 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                        <h4 className="text-lg font-semibold text-gray-900">
                          {i18n.language === 'ko' ? item.item_title : (item.item_title_en || item.item_title)}
                        </h4>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
                        {item.photos.map((photo, photoIndex) => (
                          <div key={photoIndex} className="aspect-video bg-gray-100 rounded overflow-hidden relative">
                            <Image
                              src={photo}
                              alt={`${item.item_title} - ${photoIndex + 1}`}
                              fill
                              className="object-cover"
                              unoptimized
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect width="100" height="100" fill="%23ddd"/%3E%3Ctext x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999"%3E이미지%3C/text%3E%3C/svg%3E';
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <p className="text-sm text-gray-500 mt-2">
                        사진 {item.photos.length}개
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="ml-4 text-red-600 hover:text-red-700 p-2"
                      disabled={isLoading}
                      title="삭제"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

