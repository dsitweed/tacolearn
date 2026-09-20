'use client';

import { BookOpen, Clock, Filter, Search } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui';
import { ExamCard } from '@/features/exams/components/ExamCard';
import { Exam } from '@/generated/model/exam';
import { useExams } from '@/hooks/api';

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const { data: exams, isLoading, error } = useExams();

  const filteredExams = exams?.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (exam.description?.toLowerCase() || '').includes(
        searchTerm.toLowerCase(),
      );

    const matchesLevel =
      levelFilter === 'all' || exam.jlptLevel === levelFilter;
    const matchesType = typeFilter === 'all' || exam.type === typeFilter;

    return matchesSearch && matchesLevel && matchesType;
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
            <p className="text-muted-foreground mt-4">
              Đang tải danh sách đề thi...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-destructive/10 border-destructive rounded-lg border p-6">
          <h3 className="text-destructive mb-2 font-semibold">
            Lỗi khi tải danh sách đề thi
          </h3>
          <p className="text-destructive/80">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Đề Thi JLPT</h1>
        <p className="text-muted-foreground">
          Luyện tập với các đề thi JLPT chính thức và đề thi mô phỏng
        </p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                <Input
                  placeholder="Tìm kiếm đề thi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Level Filter */}
            <div>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Cấp độ JLPT" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả cấp độ</SelectItem>
                  <SelectItem value="N5">N5</SelectItem>
                  <SelectItem value="N4">N4</SelectItem>
                  <SelectItem value="N3">N3</SelectItem>
                  <SelectItem value="N2">N2</SelectItem>
                  <SelectItem value="N1">N1</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Type Filter */}
            <div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Loại đề thi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả loại</SelectItem>
                  <SelectItem value="OFFICIAL">Đề chính thức</SelectItem>
                  <SelectItem value="MOCK">Đề mô phỏng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Tổng số đề thi</p>
                <p className="text-2xl font-bold">{exams?.length || 0}</p>
              </div>
              <BookOpen className="text-primary h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đề chính thức</p>
                <p className="text-2xl font-bold">
                  {exams?.filter((e) => e.type === 'OFFICIAL').length || 0}
                </p>
              </div>
              <Filter className="text-primary h-8 w-8" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Đề mô phỏng</p>
                <p className="text-2xl font-bold">
                  {exams?.filter((e) => e.type === 'MOCK').length || 0}
                </p>
              </div>
              <Clock className="text-primary h-8 w-8" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredExams?.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <BookOpen className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
            <h3 className="mb-2 text-lg font-semibold">
              Không tìm thấy đề thi
            </h3>
            <p className="text-muted-foreground">
              Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        ) : (
          filteredExams?.map((exam) => <ExamCard key={exam.id} exam={exam} />)
        )}
      </div>
    </div>
  );
}
