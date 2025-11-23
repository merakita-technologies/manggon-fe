// components/query-editor.tsx
"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Save, Download } from "lucide-react"

export function QueryEditor() {
  const [query, setQuery] = useState('SELECT * FROM users LIMIT 10;')
  const [results, setResults] = useState<any>(null)

  const executeQuery = () => {
    // Mock execution
    setResults({
      columns: ['id', 'name', 'email', 'created_at'],
      rows: [
        { id: 1, name: 'John Doe', email: 'john@example.com', created_at: '2023-01-01' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', created_at: '2023-01-02' },
      ]
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Query Editor</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button onClick={executeQuery} size="sm">
              <Play className="h-4 w-4 mr-2" />
              Execute
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="query">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="query">Query</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="explain">Explain</TabsTrigger>
          </TabsList>
          
          <TabsContent value="query" className="space-y-4">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-32 font-mono text-sm"
              placeholder="Enter your SQL query here..."
            />
          </TabsContent>
          
          <TabsContent value="results">
            {results ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    {results.rows.length} rows returned
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        {results.columns.map((column: string) => (
                          <TableHead key={column}>{column}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {results.rows.map((row: any, index: number) => (
                        <TableRow key={index}>
                          {results.columns.map((column: string) => (
                            <TableCell key={column} className="font-mono text-xs">
                              {row[column]}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No results to display. Execute a query to see results.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="explain">
            <div className="text-center py-8 text-muted-foreground">
              Query execution plan will appear here.
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}