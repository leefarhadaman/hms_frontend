'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { testConnection, authApi } from '@/lib/api'

export default function ApiTest() {
  const [testResult, setTestResult] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleHealthCheck = async () => {
    setLoading(true)
    try {
      const result = await testConnection()
      setTestResult(JSON.stringify(result, null, 2))
    } catch (error) {
      setTestResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleAuthTest = async () => {
    setLoading(true)
    try {
      const result = await authApi.login('test@example.com', 'password')
      setTestResult(JSON.stringify(result, null, 2))
    } catch (error) {
      setTestResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>API Test Component</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={handleHealthCheck} disabled={loading}>
            {loading ? 'Testing...' : 'Test Health Check'}
          </Button>
          <Button onClick={handleAuthTest} disabled={loading}>
            {loading ? 'Testing...' : 'Test Auth'}
          </Button>
        </div>
        
        {testResult && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Result:</h3>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {testResult}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  )
}