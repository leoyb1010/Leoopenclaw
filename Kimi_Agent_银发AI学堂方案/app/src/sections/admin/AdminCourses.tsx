import { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Eye, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

// 模拟课程数据
const initialCourses = [
  { id: '1', title: '豆包帮您安排一天', model: '豆包', category: '生活', lessons: 6, students: 156, status: 'published', isVip: false },
  { id: '2', title: '千问帮您选商品', model: '通义千问', category: '购物', lessons: 5, students: 128, status: 'published', isVip: false },
  { id: '3', title: '阿福教您养生知识', model: '蚂蚁阿福', category: '健康', lessons: 6, students: 203, status: 'published', isVip: false },
  { id: '4', title: '一言陪您学知识', model: '文心一言', category: '学习', lessons: 8, students: 89, status: 'published', isVip: false },
  { id: '5', title: '豆包写退休游记', model: '豆包', category: '生活', lessons: 10, students: 76, status: 'published', isVip: true },
  { id: '6', title: '千问教您比价省钱', model: '通义千问', category: '购物', lessons: 8, students: 92, status: 'published', isVip: true },
];

const aiModels = ['豆包', '通义千问', '蚂蚁阿福', '文心一言', '智谱清言', '腾讯混元'];
const categories = ['生活', '购物', '健康', '学习', '办公', '娱乐'];

export function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [, setEditingCourse] = useState<any>(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    subtitle: '',
    model: '豆包',
    category: '生活',
    lessons: 1,
    isVip: false,
    description: '',
  });

  const filteredCourses = courses.filter(course => 
    course.title.includes(searchQuery) || 
    course.model.includes(searchQuery)
  );

  const handleAddCourse = () => {
    const course = {
      id: Date.now().toString(),
      title: newCourse.title,
      model: newCourse.model,
      category: newCourse.category,
      lessons: newCourse.lessons,
      students: 0,
      status: 'published',
      isVip: newCourse.isVip,
    };
    setCourses([...courses, course]);
    setShowAddDialog(false);
    setNewCourse({
      title: '',
      subtitle: '',
      model: '豆包',
      category: '生活',
      lessons: 1,
      isVip: false,
      description: '',
    });
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('确定要删除这门课程吗？')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* 标题和操作栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-elder-dark">课程管理</h2>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="搜索课程..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button 
            onClick={() => setShowAddDialog(true)}
            className="bg-elder-primary hover:bg-elder-primary-dark"
          >
            <Plus className="w-5 h-5 mr-1" />
            添加课程
          </Button>
        </div>
      </div>

      {/* 课程列表 */}
      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">课程信息</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">AI模型</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">分类</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">课时</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">学员数</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">状态</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-elder-primary/10 rounded-lg flex items-center justify-center">
                        <span className="text-elder-primary font-bold">{course.title.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-elder-dark">{course.title}</p>
                        {course.isVip && (
                          <span className="text-xs text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">VIP</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.model}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.lessons}节</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{course.students}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      course.status === 'published' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {course.status === 'published' ? '已发布' : '草稿'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingCourse(course)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-blue-500"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteCourse(course.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 添加课程弹窗 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">添加新课程</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程标题</label>
              <Input
                value={newCourse.title}
                onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                placeholder="请输入课程标题"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">副标题</label>
              <Input
                value={newCourse.subtitle}
                onChange={(e) => setNewCourse({ ...newCourse, subtitle: e.target.value })}
                placeholder="请输入副标题"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">AI模型</label>
                <select
                  value={newCourse.model}
                  onChange={(e) => setNewCourse({ ...newCourse, model: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg"
                >
                  {aiModels.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={newCourse.category}
                  onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                  className="w-full h-10 px-3 border border-gray-200 rounded-lg"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">课时数量</label>
                <Input
                  type="number"
                  value={newCourse.lessons}
                  onChange={(e) => setNewCourse({ ...newCourse, lessons: parseInt(e.target.value) || 1 })}
                  min={1}
                />
              </div>
              <div className="flex items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newCourse.isVip}
                    onChange={(e) => setNewCourse({ ...newCourse, isVip: e.target.checked })}
                    className="w-5 h-5"
                  />
                  <span className="text-sm text-gray-700">VIP专属课程</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">课程描述</label>
              <textarea
                value={newCourse.description}
                onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                placeholder="请输入课程描述"
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">封面图片</label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">点击上传或拖拽图片到此处</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
              取消
            </Button>
            <Button onClick={handleAddCourse} className="flex-1 bg-elder-primary hover:bg-elder-primary-dark">
              确认添加
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
