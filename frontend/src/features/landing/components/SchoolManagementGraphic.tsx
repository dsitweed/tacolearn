'use client';

import { MoreHorizontal, Send, Users } from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui';

export function SchoolManagementGraphic() {
  const students = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      code: 'N3-01',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      level: 'N3',
      progress: 92,
      status: 'Xuất sắc',
      statusVariant: 'emerald',
    },
    {
      id: '2',
      name: 'Trần Thị B',
      code: 'N3-02',
      avatar:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      level: 'N3',
      progress: 64,
      status: 'Cần chú ý',
      statusVariant: 'amber',
    },
    {
      id: '3',
      name: 'Lê Văn C',
      code: 'N3-03',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      level: 'N3',
      progress: 88,
      status: 'Tốt',
      statusVariant: 'indigo',
    },
  ];

  return (
    <Card className="overflow-hidden border-slate-800 bg-slate-900/95 p-5 text-white shadow-2xl">
      {/* Top Graphic Header */}
      <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
        <div className="flex items-center gap-2">
          <Users className="size-4 text-indigo-400" />
          <span className="font-semibold text-slate-200">
            Lớp N3-K24 • Báo cáo chuyên cần & SRS
          </span>
        </div>
        <Badge
          variant="outline"
          className="border-emerald-500/30 bg-emerald-500/10 text-[10px] text-emerald-400"
        >
          28 Học viên
        </Badge>
      </div>

      {/* Mini Cohort Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
        <Table>
          <TableHeader className="bg-slate-900/80">
            <TableRow className="border-slate-800 hover:bg-slate-900/80">
              <TableHead className="h-9 text-[11px] text-slate-400">
                Học viên
              </TableHead>
              <TableHead className="h-9 text-[11px] text-slate-400">
                Cấp độ
              </TableHead>
              <TableHead className="h-9 text-[11px] text-slate-400">
                Tiến độ SRS
              </TableHead>
              <TableHead className="h-9 text-[11px] text-slate-400">
                Trạng thái
              </TableHead>
              <TableHead className="h-9 text-right text-[11px] text-slate-400">
                Thao tác
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                className="border-slate-800/60 hover:bg-slate-900/40"
              >
                <TableCell className="py-2.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-7 border border-slate-700">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback className="bg-indigo-950 text-[10px] text-indigo-300">
                        {student.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-xs font-medium text-slate-200">
                        {student.name}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {student.code}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-2.5 text-xs text-slate-300">
                  {student.level}
                </TableCell>
                <TableCell className="py-2.5">
                  <div className="w-24 space-y-1">
                    <Progress
                      value={student.progress}
                      className="h-1.5 bg-slate-800 [&>div]:bg-indigo-500"
                    />
                    <span className="text-[10px] text-slate-400">
                      {student.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2.5">
                  {student.statusVariant === 'emerald' && (
                    <Badge className="border-emerald-500/30 bg-emerald-500/20 px-2 py-0 text-[10px] text-emerald-300">
                      {student.status}
                    </Badge>
                  )}
                  {student.statusVariant === 'amber' && (
                    <Badge className="border-amber-500/30 bg-amber-500/20 px-2 py-0 text-[10px] text-amber-300">
                      {student.status}
                    </Badge>
                  )}
                  {student.statusVariant === 'indigo' && (
                    <Badge className="border-indigo-500/30 bg-indigo-500/20 px-2 py-0 text-[10px] text-indigo-300">
                      {student.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="py-2.5 text-right">
                  {student.statusVariant === 'amber' ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 bg-amber-950/40 px-2 text-[10px] text-amber-300 hover:bg-amber-900/60"
                    >
                      <Send className="mr-1 size-3" />
                      Nhắc nhở
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 w-6 p-0 text-slate-400 hover:text-white"
                    >
                      <MoreHorizontal className="size-4" />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Quick Metric */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-800 pt-3 text-[11px] text-slate-400">
        <span>Tổng số học viên: 28</span>
        <span className="font-medium text-emerald-400">
          Hoàn thành bài tập hôm nay: 89%
        </span>
      </div>
    </Card>
  );
}
